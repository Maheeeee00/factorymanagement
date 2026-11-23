import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Plus, Search, Download, ClipboardList, X, Check, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore, useMoney, fmtDate, fmtQty, toCSV, download, STATUS_LABEL, SALES_FLOW, PURCHASE_FLOW } from '../lib/store'
import { PageHead, Tabs, StatusBadge, Modal, Field, Empty, toast } from '../components/ui'

const DAY = 86400000
const PER = 12

export default function Orders() {
  const { state } = useStore()
  const money = useMoney()
  const [params, setParams] = useSearchParams()
  const [type, setType] = useState(params.get('new') === 'purchase' ? 'purchase' : 'sales')
  const [status, setStatus] = useState('all')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(0)
  const [openId, setOpenId] = useState(params.get('open'))
  const [creating, setCreating] = useState(params.get('new'))

  useEffect(() => { if (params.get('open') || params.get('new')) setParams({}, { replace: true }) }, []) // eslint-disable-line

  const isSales = type === 'sales'
  const flow = isSales ? [...SALES_FLOW, 'cancelled'] : [...PURCHASE_FLOW, 'cancelled']
  const parties = isSales ? state.customers : state.suppliers
  const partyName = (id) => parties.find((p) => p.id === id)?.name || '—'
  const all = state.orders.filter((o) => o.type === type).slice().sort((a, b) => b.createdAt - a.createdAt)
  const list = useMemo(() => all.filter((o) => (status === 'all' || o.status === status) && `${o.number} ${partyName(o.party)}`.toLowerCase().includes(q.toLowerCase())), [all, status, q]) // eslint-disable-line
  const pages = Math.max(1, Math.ceil(list.length / PER))
  const shown = list.slice(page * PER, page * PER + PER)
  const openOrder = state.orders.find((o) => o.id === openId)
  const now = Date.now()

  const exportCsv = () => {
    const head = ['Order', 'Date', isSales ? 'Customer' : 'Supplier', 'Items', 'Subtotal', 'Tax', 'Total', 'Status', 'Due']
    download(`${type}-orders.csv`, toCSV([head, ...list.map((o) => [o.number, fmtDate(o.createdAt), partyName(o.party), o.items.map((i) => `${i.qty}x ${i.name}`).join('; '), o.subtotal, o.tax, o.total, STATUS_LABEL[o.status], fmtDate(o.dueDate)])]))
  }

  return (
    <div>
      <PageHead tone="purple" icon={ClipboardList} title="Orders" sub="Sales orders to customers and purchase orders to suppliers" stats={[['Open', all.filter((o) => !['delivered', 'received', 'cancelled'].includes(o.status)).length], ['Overdue', all.filter((o) => !['delivered', 'received', 'cancelled'].includes(o.status) && o.dueDate < now).length], ['Total value', (() => { const v = all.filter((o) => o.status !== 'cancelled').reduce((a, o) => a + o.total, 0); return v >= 1e6 ? `${state.settings.currency} ${(v / 1e6).toFixed(1)}M` : money(v) })()]]}>
        <button onClick={exportCsv} className="btn-ghost"><Download className="h-4 w-4" />Export</button>
        <button onClick={() => setCreating(type)} className="btn-primary"><Plus className="h-4 w-4" /><span className="sm:hidden">New order</span><span className="hidden sm:inline">{isSales ? 'New sales order' : 'New purchase order'}</span></button>
      </PageHead>

      <div className="card">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4">
          <Tabs value={type} onChange={(t) => { setType(t); setStatus('all'); setPage(0) }} tabs={[['sales', 'Sales orders', state.orders.filter((o) => o.type === 'sales').length], ['purchase', 'Purchase orders', state.orders.filter((o) => o.type === 'purchase').length]]} />
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => { setQ(e.target.value); setPage(0) }} className="input pl-9" placeholder={`Search order no. or ${isSales ? 'customer' : 'supplier'}`} />
          </div>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-slate-100 px-4 py-3">
          {['all', ...flow].map((s) => {
            const c = s === 'all' ? all.length : all.filter((o) => o.status === s).length
            return <button key={s} onClick={() => { setStatus(s); setPage(0) }} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${status === s ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{s === 'all' ? 'All' : STATUS_LABEL[s]} · {c}</button>
          })}
        </div>
        {/* Mobile cards */}
        <div className="stagger divide-y divide-slate-100 md:hidden">
          {shown.map((o) => {
            const open = !['delivered', 'received', 'cancelled'].includes(o.status)
            const late = open && o.dueDate < now
            return (
              <button key={o.id} onClick={() => setOpenId(o.id)} className="block w-full p-4 text-left active:bg-slate-50">
                <div className="flex items-center justify-between gap-2"><span className="font-bold text-ink-900">{o.number}</span><StatusBadge status={o.status} /></div>
                <p className="mt-1 truncate text-sm text-slate-700">{partyName(o.party)}</p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className={late ? 'font-semibold text-rose-600' : 'text-slate-500'}>{late ? 'Overdue · ' : 'Due '}{fmtDate(o.dueDate)} · {o.items.length} item{o.items.length === 1 ? '' : 's'}</span>
                  <span className="text-sm font-bold text-ink-900">{money(o.total)}</span>
                </div>
              </button>
            )
          })}
          {shown.length === 0 && <Empty icon={ClipboardList} title="No orders found" text="Try another filter or create a new order" />}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr><th className="th">Order</th><th className="th">Date</th><th className="th">{isSales ? 'Customer' : 'Supplier'}</th><th className="th">Items</th><th className="th">Due</th><th className="th text-right">Total</th><th className="th text-right">Status</th></tr></thead>
            <tbody className="stagger divide-y divide-slate-100">
              {shown.map((o) => {
                const open = !['delivered', 'received', 'cancelled'].includes(o.status)
                const late = open && o.dueDate < now
                return (
                  <tr key={o.id} onClick={() => setOpenId(o.id)} className="cursor-pointer hover:bg-brand-50/40">
                    <td className="td font-bold text-ink-900">{o.number}</td>
                    <td className="td text-slate-500">{fmtDate(o.createdAt)}</td>
                    <td className="td">{partyName(o.party)}</td>
                    <td className="td text-slate-500">{o.items.length} item{o.items.length === 1 ? '' : 's'}</td>
                    <td className={`td ${late ? 'font-semibold text-rose-600' : 'text-slate-500'}`}>{late ? 'Overdue · ' : ''}{fmtDate(o.dueDate)}</td>
                    <td className="td text-right font-semibold">{money(o.total)}</td>
                    <td className="td text-right"><StatusBadge status={o.status} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {shown.length === 0 && <Empty icon={ClipboardList} title="No orders found" text="Try another filter or create a new order" />}
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 p-4 text-sm">
          <span className="text-slate-500">{list.length} orders · {page + 1}/{pages}</span>
          <div className="flex gap-2">
            <button disabled={page === 0} onClick={() => setPage(page - 1)} className="btn-ghost px-3 py-2"><ChevronLeft className="h-4 w-4" /></button>
            <button disabled={page >= pages - 1} onClick={() => setPage(page + 1)} className="btn-ghost px-3 py-2"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {openOrder && <OrderDetail order={openOrder} onClose={() => setOpenId(null)} />}
      {creating && <NewOrder type={creating} onClose={() => setCreating(null)} onCreated={(t) => { setType(t); setStatus('all'); setPage(0) }} />}
    </div>
  )
}

function OrderDetail({ order, onClose }) {
  const { state, dispatch } = useStore()
  const money = useMoney()
  const isSales = order.type === 'sales'
  const flow = isSales ? SALES_FLOW : PURCHASE_FLOW
  const party = (isSales ? state.customers : state.suppliers).find((p) => p.id === order.party)
  const idx = flow.indexOf(order.status)
  const next = idx >= 0 && idx < flow.length - 1 ? flow[idx + 1] : null
  const shortages = isSales && next === 'dispatched' ? order.items.filter((i) => (state.products.find((p) => p.id === i.id)?.qty || 0) < i.qty) : []
  const setStatus = (s) => { dispatch({ type: 'ORDER_STATUS', id: order.id, status: s }); toast(`${order.number} → ${STATUS_LABEL[s]}`) }

  return (
    <Modal open onClose={onClose} title={`${isSales ? 'Sales' : 'Purchase'} order ${order.number}`} wide>
      <div className="space-y-5">
        {/* progress */}
        {order.status === 'cancelled' ? (
          <div className="rounded-2xl bg-rose-50 p-4 text-sm font-semibold text-rose-700">This order was cancelled.</div>
        ) : (
          <div className="flex items-start">
            {flow.map((s, i) => (
              <div key={s} className="relative flex flex-1 flex-col items-center text-center">
                {i > 0 && <div className={`absolute right-1/2 top-4 h-1 w-full -translate-y-1/2 ${i <= idx ? 'bg-brand-600' : 'bg-slate-200'}`} />}
                <div className={`relative z-10 grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${i <= idx ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{i < idx ? <Check className="h-4 w-4" /> : i + 1}</div>
                <p className={`mt-1.5 text-[10px] font-semibold leading-tight sm:text-[11px] ${i <= idx ? 'text-ink-900' : 'text-slate-400'}`}>{STATUS_LABEL[s]}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4 text-sm sm:grid-cols-4">
          <div className="col-span-2"><p className="text-xs text-slate-500">{isSales ? 'Customer' : 'Supplier'}</p><p className="font-semibold">{party?.name || '—'}</p><p className="text-xs text-slate-500">{party?.city} · {party?.phone}</p></div>
          <div><p className="text-xs text-slate-500">Order date</p><p className="font-semibold">{fmtDate(order.createdAt)}</p></div>
          <div><p className="text-xs text-slate-500">Due date</p><p className="font-semibold">{fmtDate(order.dueDate)}</p></div>
        </div>

        <table className="w-full text-sm">
          <thead><tr className="border-b border-slate-100"><th className="py-2 text-left text-xs font-semibold uppercase text-slate-500">Item</th><th className="py-2 text-right text-xs font-semibold uppercase text-slate-500">Qty</th><th className="py-2 text-right text-xs font-semibold uppercase text-slate-500">Price</th><th className="py-2 text-right text-xs font-semibold uppercase text-slate-500">Amount</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {order.items.map((i) => <tr key={i.id}><td className="py-2.5 font-medium">{i.name}</td><td className="py-2.5 text-right">{fmtQty(i.qty)}</td><td className="py-2.5 text-right text-slate-500">{money(i.price)}</td><td className="py-2.5 text-right font-semibold">{money(i.qty * i.price)}</td></tr>)}
          </tbody>
        </table>
        <div className="ml-auto max-w-xs space-y-1 text-sm">
          <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>{money(order.subtotal)}</span></div>
          <div className="flex justify-between text-slate-600"><span>Sales tax</span><span>{money(order.tax)}</span></div>
          <div className="flex justify-between border-t pt-2 text-base font-bold text-ink-900"><span>Total</span><span>{money(order.total)}</span></div>
        </div>
        {order.notes && <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">📝 {order.notes}</p>}

        {shortages.length > 0 && (
          <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">
            <p className="flex items-center gap-2 font-semibold"><AlertTriangle className="h-4 w-4" />Not enough finished stock to dispatch</p>
            <ul className="mt-1 list-disc pl-6">{shortages.map((i) => <li key={i.id}>{i.name}: need {fmtQty(i.qty)}, have {fmtQty(state.products.find((p) => p.id === i.id)?.qty || 0)}</li>)}</ul>
            <p className="mt-1">Record production on the Products page first.</p>
          </div>
        )}

        {order.status !== 'cancelled' && (
          <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
            {next && <button disabled={shortages.length > 0} onClick={() => setStatus(next)} className="btn-primary w-full sm:w-auto sm:flex-1"><Check className="h-4 w-4" />Mark as {STATUS_LABEL[next].toLowerCase()}</button>}
            {!['delivered', 'received', 'dispatched'].includes(order.status) && <button onClick={() => setStatus('cancelled')} className="btn-danger w-full sm:w-auto"><X className="h-4 w-4" />Cancel order</button>}
          </div>
        )}
        <p className="text-center text-xs text-slate-500">{isSales ? 'Dispatching deducts finished goods from stock.' : 'Receiving adds the materials to stock.'} Every change is recorded in History.</p>
      </div>
    </Modal>
  )
}

function NewOrder({ type, onClose, onCreated }) {
  const { state, dispatch } = useStore()
  const money = useMoney()
  const isSales = type === 'sales'
  const parties = isSales ? state.customers : state.suppliers
  const catalog = isSales ? state.products.map((p) => ({ id: p.id, name: p.name, price: p.price, stock: p.qty, unit: 'pcs' })) : state.materials.map((m) => ({ id: m.id, name: m.name, price: m.cost, stock: m.qty, unit: m.unit }))
  const [party, setParty] = useState(parties[0]?.id || '')
  const [due, setDue] = useState(new Date(Date.now() + 7 * DAY).toISOString().slice(0, 10))
  const [lines, setLines] = useState([{ id: '', qty: '', price: '' }])
  const [notes, setNotes] = useState('')
  const valid = lines.filter((l) => l.id && +l.qty > 0)
  const subtotal = valid.reduce((s, l) => s + +l.qty * +l.price, 0)
  const tax = Math.round((subtotal * state.settings.taxRate) / 100)
  const upd = (i, patch) => setLines(lines.map((l, j) => (j === i ? { ...l, ...patch } : l)))

  const submit = (e) => {
    e.preventDefault()
    if (!valid.length || !party) return
    const items = valid.map((l) => ({ id: l.id, name: catalog.find((c) => c.id === l.id).name, qty: +l.qty, price: +l.price }))
    dispatch({ type: 'CREATE_ORDER', order: { type, party, items, subtotal, tax, total: subtotal + tax, status: isSales ? 'pending' : 'draft', dueDate: new Date(due).getTime(), notes } })
    toast(`${isSales ? 'Sales' : 'Purchase'} order created`)
    onCreated(type)
    onClose()
  }

  return (
    <Modal open onClose={onClose} title={isSales ? 'New sales order' : 'New purchase order'} wide>
      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={isSales ? 'Customer' : 'Supplier'}><select required className="input" value={party} onChange={(e) => setParty(e.target.value)}>{parties.map((p) => <option key={p.id} value={p.id}>{p.name} · {p.city}</option>)}</select></Field>
          <Field label={isSales ? 'Delivery due' : 'Expected delivery'}><input type="date" required className="input" value={due} onChange={(e) => setDue(e.target.value)} /></Field>
        </div>
        <div className="rounded-2xl ring-1 ring-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <p className="font-bold">Items</p>
            <button type="button" onClick={() => setLines([...lines, { id: '', qty: '', price: '' }])} className="btn-ghost py-1.5 text-xs"><Plus className="h-3.5 w-3.5" />Add line</button>
          </div>
          <div className="space-y-2 p-4">
            {lines.map((l, i) => {
              const c = catalog.find((x) => x.id === l.id)
              return (
                <div key={i} className="grid grid-cols-12 items-center gap-2">
                  <select className="input col-span-12 sm:col-span-6" value={l.id} onChange={(e) => { const it = catalog.find((x) => x.id === e.target.value); upd(i, { id: e.target.value, price: it ? it.price : '' }) }}>
                    <option value="">Select {isSales ? 'product' : 'material'}…</option>
                    {catalog.map((it) => <option key={it.id} value={it.id}>{it.name} · {fmtQty(it.stock)} {it.unit} in stock</option>)}
                  </select>
                  <input type="number" min="0" step="any" placeholder="Qty" className="input col-span-4 sm:col-span-2" value={l.qty} onChange={(e) => upd(i, { qty: e.target.value })} />
                  <input type="number" min="0" step="any" placeholder="Price" className="input col-span-5 sm:col-span-2" value={l.price} onChange={(e) => upd(i, { price: e.target.value })} />
                  <span className="col-span-2 text-right text-xs font-semibold sm:col-span-1">{c && +l.qty ? Math.round(+l.qty * +l.price).toLocaleString() : ''}</span>
                  <button type="button" onClick={() => setLines(lines.length > 1 ? lines.filter((_, j) => j !== i) : [{ id: '', qty: '', price: '' }])} className="col-span-1 grid place-items-center rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><X className="h-4 w-4" /></button>
                </div>
              )
            })}
          </div>
        </div>
        <Field label="Notes (optional)"><input className="input" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Delivery instructions, packing, payment terms…" /></Field>
        <div className="ml-auto max-w-xs space-y-1 text-sm">
          <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="flex justify-between text-slate-600"><span>Sales tax ({state.settings.taxRate}%)</span><span>{money(tax)}</span></div>
          <div className="flex justify-between border-t pt-2 text-base font-bold text-ink-900"><span>Total</span><span>{money(subtotal + tax)}</span></div>
        </div>
        <button disabled={!valid.length || !party} className="btn-primary w-full py-3">Create order</button>
      </form>
    </Modal>
  )
}
