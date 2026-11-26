// Demo seed data for Factora. Everything can be edited in the app (Settings → Reset restores this).

export const DEFAULT_SETTINGS = {
  companyName: 'Golden Harvest Flour Mills',
  tagline: 'Atta · Maida · Fine · Chokar',
  address: 'Industrial Estate, Lahore',
  phone: '+92 300 0000000',
  email: 'info@goldenharvest.example',
  currency: 'Rs',
  taxRate: 0,
  lowStockAlerts: true,
  orderPrefix: 'SO',
  purchasePrefix: 'PO',
  lang: 'en',
}

export const MATERIAL_CATEGORIES = ['Grain', 'Bags', 'Consumables']
export const PRODUCT_CATEGORIES = ['Atta', 'Maida', 'Fine', 'Chokar']

export const MATERIALS = [
  { id: 'rm1', sku: 'RM-WHT-01', name: 'Wheat (gandum)', category: 'Grain', unit: 'kg', qty: 185000, min: 80000, cost: 90, supplier: 'sp1', location: 'Silo 1 & 2' },
  { id: 'rm2', sku: 'BG-PP-10', name: 'PP bag 10 kg', category: 'Bags', unit: 'pcs', qty: 4200, min: 3000, cost: 22, supplier: 'sp2', location: 'Bag store A' },
  { id: 'rm3', sku: 'BG-PP-15', name: 'PP bag 15 kg', category: 'Bags', unit: 'pcs', qty: 2100, min: 2500, cost: 28, supplier: 'sp2', location: 'Bag store A' },
  { id: 'rm4', sku: 'BG-PP-20', name: 'PP bag 20 kg', category: 'Bags', unit: 'pcs', qty: 3600, min: 2500, cost: 32, supplier: 'sp2', location: 'Bag store A' },
  { id: 'rm5', sku: 'BG-PP-50', name: 'PP bag 50 kg', category: 'Bags', unit: 'pcs', qty: 1800, min: 1000, cost: 55, supplier: 'sp2', location: 'Bag store B' },
  { id: 'rm6', sku: 'BG-PP-80', name: 'PP bag 80 kg', category: 'Bags', unit: 'pcs', qty: 900, min: 1200, cost: 75, supplier: 'sp2', location: 'Bag store B' },
  { id: 'rm7', sku: 'CN-THR-01', name: 'Bag stitching thread', category: 'Consumables', unit: 'spools', qty: 40, min: 30, cost: 450, supplier: 'sp4', location: 'Packing hall' },
  { id: 'rm8', sku: 'CN-DSL-01', name: 'Diesel (generator)', category: 'Consumables', unit: 'L', qty: 600, min: 400, cost: 280, supplier: 'sp3', location: 'Fuel tank' },
]

const ATTA = 'linear-gradient(135deg, #fde68a, #d97706)'
const MAIDA = 'linear-gradient(135deg, #f1f5f9, #94a3b8)'
const FINE = 'linear-gradient(135deg, #fef3c7, #f59e0b)'
const CHOKAR = 'linear-gradient(135deg, #d6d3d1, #78350f)'
const bag = (kg, bagId, wheatPerKg) => [{ m: 'rm1', q: +(kg * wheatPerKg).toFixed(2) }, { m: bagId, q: 1 }, { m: 'rm7', q: 0.002 }]

export const PRODUCTS = [
  { id: 'p1', sku: 'AT-10', name: 'Atta 10 kg', category: 'Atta', emoji: '🌾', bg: ATTA, price: 1250, qty: 1200, min: 500, bom: bag(10, 'rm2', 1.05) },
  { id: 'p2', sku: 'AT-15', name: 'Atta 15 kg', category: 'Atta', emoji: '🌾', bg: ATTA, price: 1850, qty: 650, min: 400, bom: bag(15, 'rm3', 1.05) },
  { id: 'p3', sku: 'AT-20', name: 'Atta 20 kg', category: 'Atta', emoji: '🌾', bg: ATTA, price: 2450, qty: 900, min: 500, bom: bag(20, 'rm4', 1.05) },
  { id: 'p4', sku: 'AT-79', name: 'Atta 79 kg', category: 'Atta', emoji: '🌾', bg: ATTA, price: 9500, qty: 140, min: 150, bom: bag(79, 'rm6', 1.05) },
  { id: 'p5', sku: 'MD-10', name: 'Maida 10 kg', category: 'Maida', emoji: '🥐', bg: MAIDA, price: 1400, qty: 800, min: 400, bom: bag(10, 'rm2', 1.25) },
  { id: 'p6', sku: 'MD-50', name: 'Maida 50 kg', category: 'Maida', emoji: '🥐', bg: MAIDA, price: 6750, qty: 220, min: 150, bom: bag(50, 'rm5', 1.25) },
  { id: 'p7', sku: 'MD-80', name: 'Maida 80 kg', category: 'Maida', emoji: '🥐', bg: MAIDA, price: 10700, qty: 90, min: 100, bom: bag(80, 'rm6', 1.25) },
  { id: 'p8', sku: 'FN-80', name: 'Fine 80 kg', category: 'Fine', emoji: '🫓', bg: FINE, price: 11000, qty: 160, min: 120, bom: bag(80, 'rm6', 1.2) },
  { id: 'p9', sku: 'CH-50', name: 'Chokar 50 kg', category: 'Chokar', emoji: '🟤', bg: CHOKAR, price: 3400, qty: 300, min: 200, bom: bag(50, 'rm5', 0.3) },
]

export const CUSTOMERS = [
  { id: 'c1', name: 'City Traders', city: 'Lahore', phone: '0300-1111111' },
  { id: 'c2', name: 'Lahore Bakers', city: 'Lahore', phone: '0301-2222222' },
  { id: 'c3', name: 'Hamza Distributors', city: 'Faisalabad', phone: '0302-3333333' },
  { id: 'c4', name: 'Prime Wholesale', city: 'Gujranwala', phone: '0303-4444444' },
  { id: 'c5', name: 'Royal Sweets & Bakers', city: 'Sheikhupura', phone: '0304-5555555' },
  { id: 'c6', name: 'Madina Kiryana Store', city: 'Kasur', phone: '0305-6666666' },
]

export const SUPPLIERS = [
  { id: 'sp1', name: 'Punjab Grain Traders', city: 'Okara', phone: '044-1112222' },
  { id: 'sp2', name: 'Prime PP Bags', city: 'Lahore', phone: '042-3334444' },
  { id: 'sp3', name: 'City Fuel Station', city: 'Lahore', phone: '042-5556666' },
  { id: 'sp4', name: 'Thread & Twine Co.', city: 'Faisalabad', phone: '041-7778888' },
]

export const USERS = [
  { id: 'u1', name: 'Ahmed Raza', role: 'Admin', email: 'admin@factora.demo', color: '#2550eb' },
  { id: 'u2', name: 'Sana Iqbal', role: 'Store Manager', email: 'store@factora.demo', color: '#059669' },
  { id: 'u3', name: 'Bilal Khan', role: 'Production Supervisor', email: 'production@factora.demo', color: '#d97706' },
  { id: 'u4', name: 'Hira Javed', role: 'Sales', email: 'sales@factora.demo', color: '#db2777' },
]

// ---------- deterministic demo history ----------
function rng(seed) { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647) }
const DAY = 86400000

export function buildSeed() {
  const r = rng(7)
  const now = Date.now()
  const orders = []
  const history = []
  let so = 1001, po = 501, h = 1
  const log = (e) => history.push({ id: `h${h++}`, ...e })

  // sales orders over the last 60 days
  for (let d = 59; d >= 0; d -= 1 + Math.floor(r() * 2)) {
    const created = now - d * DAY - Math.floor(r() * 8) * 3600000
    const n = 1 + Math.floor(r() * 3)
    const items = []
    for (let i = 0; i < n; i++) {
      const p = PRODUCTS[Math.floor(r() * PRODUCTS.length)]
      if (items.find((x) => x.id === p.id)) continue
      const qty = (p.price > 5000 ? 10 : 30) + Math.floor(r() * 12) * (p.price > 5000 ? 5 : 20)
      items.push({ id: p.id, name: p.name, qty, price: p.price })
    }
    const age = d
    const status = age > 14 ? (r() < 0.06 ? 'cancelled' : 'delivered') : age > 7 ? ['dispatched', 'delivered', 'delivered'][Math.floor(r() * 3)] : age > 3 ? ['in_production', 'ready', 'dispatched'][Math.floor(r() * 3)] : ['pending', 'in_production'][Math.floor(r() * 2)]
    const customer = CUSTOMERS[Math.floor(r() * CUSTOMERS.length)].id
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0)
    const tax = 0
    const order = { id: `so${so}`, number: `SO-${so}`, type: 'sales', party: customer, items, subtotal, tax, total: subtotal + tax, status, createdAt: created, dueDate: created + (5 + Math.floor(r() * 10)) * DAY, notes: '' }
    orders.push(order)
    log({ at: created, kind: 'order', action: 'Order created', ref: order.number, detail: `${items.length} item(s) · Rs ${order.total.toLocaleString()}`, user: 'Hira Javed' })
    if (['dispatched', 'delivered'].includes(status)) {
      items.forEach((i) => log({ at: created + 2 * DAY, kind: 'stock_out', action: 'Dispatched', ref: order.number, item: i.name, qty: -i.qty, detail: `Finished goods dispatched`, user: 'Sana Iqbal' }))
    }
    so++
  }

  // purchase orders
  for (let d = 55; d >= 0; d -= 4 + Math.floor(r() * 4)) {
    const created = now - d * DAY
    const sp = SUPPLIERS[Math.floor(r() * SUPPLIERS.length)]
    const mats = MATERIALS.filter((m) => m.supplier === sp.id)
    const items = mats.slice(0, 1 + Math.floor(r() * Math.min(3, mats.length))).map((m) => ({ id: m.id, name: m.name, qty: m.id === 'rm1' ? 10000 + Math.floor(r() * 7) * 5000 : m.unit === 'L' ? 200 + Math.floor(r() * 5) * 50 : m.unit === 'spools' ? 10 + Math.floor(r() * 3) * 10 : 1000 + Math.floor(r() * 6) * 500, price: m.cost }))
    const status = d > 6 ? 'received' : d > 2 ? 'ordered' : 'draft'
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0)
    const tax = 0
    const order = { id: `po${po}`, number: `PO-${po}`, type: 'purchase', party: sp.id, items, subtotal, tax, total: subtotal + tax, status, createdAt: created, dueDate: created + 5 * DAY, notes: '' }
    orders.push(order)
    log({ at: created, kind: 'order', action: 'Purchase order created', ref: order.number, detail: `${sp.name} · Rs ${order.total.toLocaleString()}`, user: 'Sana Iqbal' })
    if (status === 'received') items.forEach((i) => log({ at: created + 3 * DAY, kind: 'stock_in', action: 'Received', ref: order.number, item: i.name, qty: i.qty, detail: 'Raw material received', user: 'Sana Iqbal' }))
    po++
  }

  // production runs
  for (let d = 58; d >= 0; d -= 1 + Math.floor(r() * 3)) {
    const p = PRODUCTS[Math.floor(r() * PRODUCTS.length)]
    const qty = (p.price > 5000 ? 40 : 150) + Math.floor(r() * 8) * (p.price > 5000 ? 10 : 50)
    const at = now - d * DAY + 10 * 3600000
    log({ at, kind: 'production', action: 'Production completed', ref: `BATCH-${String(9000 + h).slice(-4)}`, item: p.name, qty, detail: `Materials consumed per BOM`, user: 'Bilal Khan' })
  }

  history.sort((a, b) => b.at - a.at)
  return { orders, history, nextSO: so, nextPO: po, nextH: h }
}
