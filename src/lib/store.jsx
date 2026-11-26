import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react'
import { DEFAULT_SETTINGS, MATERIALS, PRODUCTS, CUSTOMERS, SUPPLIERS, USERS, MATERIAL_CATEGORIES, PRODUCT_CATEGORIES, buildSeed } from './data'

// All data is kept in the browser (localStorage), so the demo runs on Vercel with no backend.
// Every change that touches stock writes an entry to `history` (the audit trail).
// To go live, replace these reducer actions with PocketBase/Supabase calls.

const KEY = 'factora-state-v3'
const Ctx = createContext(null)

export function initialState() {
  const seed = buildSeed()
  return {
    settings: DEFAULT_SETTINGS,
    materialCategories: MATERIAL_CATEGORIES,
    productCategories: PRODUCT_CATEGORIES,
    materials: MATERIALS,
    products: PRODUCTS,
    customers: CUSTOMERS,
    suppliers: SUPPLIERS,
    users: USERS,
    orders: seed.orders,
    history: seed.history,
    nextSO: seed.nextSO,
    nextPO: seed.nextPO,
    nextH: seed.nextH,
    session: null,
  }
}

function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw) } catch (e) { /* ignore */ }
  return initialState()
}

const uid = (p) => p + Math.random().toString(36).slice(2, 9)

function addHistory(state, entry) {
  const e = { id: `h${state.nextH}`, at: Date.now(), user: state.session?.name || 'System', ...entry }
  return { history: [e, ...state.history], nextH: state.nextH + 1 }
}

function changeQty(list, id, delta) {
  return list.map((x) => (x.id === id ? { ...x, qty: Math.max(0, +(x.qty + delta).toFixed(2)) } : x))
}

function reducer(state, a) {
  switch (a.type) {
    case 'REPLACE': return a.state
    case 'RESET': return { ...initialState(), session: state.session }
    case 'LOGIN': return { ...state, session: a.user }
    case 'LOGOUT': return { ...state, session: null }
    case 'LANG': return { ...state, settings: { ...state.settings, lang: a.lang } }

    case 'ADJUST': {
      // a.kind: 'material' | 'product'; a.delta: +/-; a.reason
      const listKey = a.kind === 'material' ? 'materials' : 'products'
      const item = state[listKey].find((x) => x.id === a.id)
      if (!item) return state
      return {
        ...state,
        [listKey]: changeQty(state[listKey], a.id, a.delta),
        ...addHistory(state, { kind: a.delta >= 0 ? 'stock_in' : 'stock_out', action: a.delta >= 0 ? 'Stock added' : 'Stock removed', ref: item.sku, item: item.name, qty: a.delta, detail: a.reason || 'Manual adjustment' }),
      }
    }

    case 'SAVE_MATERIAL': {
      const exists = state.materials.some((m) => m.id === a.item.id)
      const item = exists ? a.item : { ...a.item, id: uid('rm') }
      return {
        ...state,
        materials: exists ? state.materials.map((m) => (m.id === item.id ? item : m)) : [...state.materials, item],
        ...addHistory(state, { kind: 'edit', action: exists ? 'Material updated' : 'Material added', ref: item.sku, item: item.name, detail: exists ? 'Details edited' : `Opening stock ${item.qty} ${item.unit}` }),
      }
    }
    case 'DELETE_MATERIAL': {
      const m = state.materials.find((x) => x.id === a.id)
      return { ...state, materials: state.materials.filter((x) => x.id !== a.id), ...addHistory(state, { kind: 'edit', action: 'Material deleted', ref: m?.sku, item: m?.name, detail: 'Removed from inventory' }) }
    }

    case 'SAVE_PRODUCT': {
      const exists = state.products.some((p) => p.id === a.item.id)
      const item = exists ? a.item : { ...a.item, id: uid('p') }
      return {
        ...state,
        products: exists ? state.products.map((p) => (p.id === item.id ? item : p)) : [...state.products, item],
        ...addHistory(state, { kind: 'edit', action: exists ? 'Product updated' : 'Product added', ref: item.sku, item: item.name, detail: exists ? 'Details edited' : 'New product created' }),
      }
    }
    case 'DELETE_PRODUCT': {
      const p = state.products.find((x) => x.id === a.id)
      return { ...state, products: state.products.filter((x) => x.id !== a.id), ...addHistory(state, { kind: 'edit', action: 'Product deleted', ref: p?.sku, item: p?.name, detail: 'Removed from catalogue' }) }
    }

    case 'PRODUCE': {
      // consume raw materials per BOM, add finished goods
      const p = state.products.find((x) => x.id === a.id)
      if (!p) return state
      let materials = state.materials
      p.bom.forEach((b) => { materials = changeQty(materials, b.m, -(b.q * a.qty)) })
      const batch = `BATCH-${String(state.nextH).padStart(4, '0')}`
      return {
        ...state,
        materials,
        products: changeQty(state.products, p.id, a.qty),
        ...addHistory(state, { kind: 'production', action: 'Production completed', ref: batch, item: p.name, qty: a.qty, detail: `Consumed: ${p.bom.map((b) => `${+(b.q * a.qty).toFixed(2)} ${state.materials.find((m) => m.id === b.m)?.unit || ''} ${state.materials.find((m) => m.id === b.m)?.name || ''}`).join(', ')}` }),
      }
    }

    case 'CREATE_ORDER': {
      const isSales = a.order.type === 'sales'
      const n = isSales ? state.nextSO : state.nextPO
      const prefix = isSales ? state.settings.orderPrefix : state.settings.purchasePrefix
      const order = { ...a.order, id: `${isSales ? 'so' : 'po'}${n}`, number: `${prefix}-${n}`, createdAt: Date.now() }
      return {
        ...state,
        orders: [...state.orders, order],
        [isSales ? 'nextSO' : 'nextPO']: n + 1,
        ...addHistory(state, { kind: 'order', action: isSales ? 'Order created' : 'Purchase order created', ref: order.number, detail: `${order.items.length} item(s) · ${state.settings.currency} ${order.total.toLocaleString()}` }),
      }
    }

    case 'ORDER_STATUS': {
      const order = state.orders.find((o) => o.id === a.id)
      if (!order || order.status === a.status) return state
      let next = { ...state, orders: state.orders.map((o) => (o.id === a.id ? { ...o, status: a.status } : o)) }
      const label = STATUS_LABEL[a.status] || a.status
      // side effects on stock
      if (order.type === 'sales' && a.status === 'dispatched' && !['dispatched', 'delivered'].includes(order.status)) {
        let products = next.products
        order.items.forEach((i) => { products = changeQty(products, i.id, -i.qty) })
        next = { ...next, products }
        order.items.forEach((i) => { next = { ...next, ...addHistory(next, { kind: 'stock_out', action: 'Dispatched', ref: order.number, item: i.name, qty: -i.qty, detail: 'Finished goods dispatched' }) } })
      } else if (order.type === 'purchase' && a.status === 'received' && order.status !== 'received') {
        let materials = next.materials
        order.items.forEach((i) => { materials = changeQty(materials, i.id, i.qty) })
        next = { ...next, materials }
        order.items.forEach((i) => { next = { ...next, ...addHistory(next, { kind: 'stock_in', action: 'Received', ref: order.number, item: i.name, qty: i.qty, detail: 'Raw material received' }) } })
      } else {
        next = { ...next, ...addHistory(next, { kind: 'order', action: `Status → ${label}`, ref: order.number, detail: `Order marked ${label.toLowerCase()}` }) }
      }
      return next
    }

    case 'SAVE_PARTY': {
      const key = a.kind === 'customer' ? 'customers' : 'suppliers'
      const exists = state[key].some((x) => x.id === a.item.id)
      const item = exists ? a.item : { ...a.item, id: a.item.id || uid(a.kind === 'customer' ? 'c' : 'sp') }
      return { ...state, [key]: exists ? state[key].map((x) => (x.id === item.id ? item : x)) : [...state[key], item] }
    }
    case 'DELETE_PARTY': {
      const key = a.kind === 'customer' ? 'customers' : 'suppliers'
      return { ...state, [key]: state[key].filter((x) => x.id !== a.id) }
    }
    case 'SAVE_USER': {
      const exists = state.users.some((x) => x.id === a.item.id)
      const item = exists ? a.item : { ...a.item, id: uid('u') }
      return { ...state, users: exists ? state.users.map((x) => (x.id === item.id ? item : x)) : [...state.users, item] }
    }
    case 'DELETE_USER': return { ...state, users: state.users.filter((x) => x.id !== a.id) }
    case 'SETTINGS':
      return { ...state, settings: { ...state.settings, ...a.patch }, ...addHistory(state, { kind: 'edit', action: 'Settings updated', ref: 'SETTINGS', detail: 'Company settings saved' }) }
    default: return state
  }
}

export const STATUS_LABEL = {
  pending: 'Pending', in_production: 'In production', ready: 'Ready', dispatched: 'Dispatched', delivered: 'Delivered', cancelled: 'Cancelled',
  draft: 'Draft', ordered: 'Ordered', received: 'Received',
}
export const STATUS_CLS = {
  pending: 'bg-amber-100 text-amber-700', in_production: 'bg-violet-100 text-violet-700', ready: 'bg-sky-100 text-sky-700',
  dispatched: 'bg-indigo-100 text-indigo-700', delivered: 'bg-emerald-100 text-emerald-700', cancelled: 'bg-rose-100 text-rose-700',
  draft: 'bg-slate-100 text-slate-600', ordered: 'bg-amber-100 text-amber-700', received: 'bg-emerald-100 text-emerald-700',
}
export const SALES_FLOW = ['pending', 'in_production', 'ready', 'dispatched', 'delivered']
export const PURCHASE_FLOW = ['draft', 'ordered', 'received']

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)
  const fromStorage = useRef(false)
  useEffect(() => {
    if (fromStorage.current) { fromStorage.current = false; return }
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch (e) { /* ignore */ }
  }, [state])
  useEffect(() => {
    const on = (e) => { if (e.key === KEY && e.newValue) { fromStorage.current = true; dispatch({ type: 'REPLACE', state: JSON.parse(e.newValue) }) } }
    window.addEventListener('storage', on)
    return () => window.removeEventListener('storage', on)
  }, [])
  const value = useMemo(() => ({ state, dispatch }), [state])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useStore = () => useContext(Ctx)

export function useMoney() {
  const { state } = useStore()
  return (n) => `${state.settings.currency} ${Math.round(n || 0).toLocaleString()}`
}

export const fmtQty = (n) => (Number.isInteger(n) ? n.toLocaleString() : (+n).toLocaleString(undefined, { maximumFractionDigits: 2 }))
export const fmtDate = (t) => new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
export const fmtDateTime = (t) => new Date(t).toLocaleString(undefined, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })

export function timeAgo(ts) {
  const m = Math.floor((Date.now() - ts) / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return d < 30 ? `${d}d ago` : fmtDate(ts)
}

// how many units can be produced with current stock
export function maxProducible(product, materials) {
  if (!product.bom?.length) return 0
  return Math.floor(Math.min(...product.bom.map((b) => { const m = materials.find((x) => x.id === b.m); return m ? m.qty / b.q : 0 })))
}

export function productCost(product, materials) {
  return (product.bom || []).reduce((s, b) => s + (materials.find((m) => m.id === b.m)?.cost || 0) * b.q, 0)
}

export function toCSV(rows) {
  return rows.map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\n')
}
export function download(name, text, type = 'text/csv') {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([text], { type }))
  a.download = name
  a.click()
}
