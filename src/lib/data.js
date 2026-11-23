// Demo seed data for Factora. Everything can be edited in the app (Settings → Reset restores this).

export const DEFAULT_SETTINGS = {
  companyName: 'Crescent Plastics Ltd.',
  tagline: 'Injection moulded household & industrial plastics',
  address: 'Plot 24, Industrial Estate, Lahore',
  phone: '+92 42 0000000',
  email: 'info@crescentplastics.example',
  currency: 'Rs',
  taxRate: 17,
  lowStockAlerts: true,
  orderPrefix: 'SO',
  purchasePrefix: 'PO',
}

export const MATERIAL_CATEGORIES = ['Resin', 'Colour', 'Components', 'Packaging', 'Consumables']
export const PRODUCT_CATEGORIES = ['Furniture', 'Household', 'Industrial', 'Bottles & Cans']

export const MATERIALS = [
  { id: 'rm1', sku: 'RM-PP-01', name: 'PP granules', category: 'Resin', unit: 'kg', qty: 1850, min: 800, cost: 380, supplier: 'sp1', location: 'Store A-1' },
  { id: 'rm2', sku: 'RM-HD-01', name: 'HDPE granules', category: 'Resin', unit: 'kg', qty: 620, min: 700, cost: 360, supplier: 'sp1', location: 'Store A-2' },
  { id: 'rm3', sku: 'RM-PET-01', name: 'PET resin', category: 'Resin', unit: 'kg', qty: 410, min: 200, cost: 420, supplier: 'sp1', location: 'Store A-3' },
  { id: 'rm4', sku: 'RM-MB-BL', name: 'Masterbatch – Blue', category: 'Colour', unit: 'kg', qty: 74, min: 40, cost: 900, supplier: 'sp2', location: 'Store B-1' },
  { id: 'rm5', sku: 'RM-MB-WH', name: 'Masterbatch – White', category: 'Colour', unit: 'kg', qty: 28, min: 40, cost: 850, supplier: 'sp2', location: 'Store B-1' },
  { id: 'rm6', sku: 'RM-HND-01', name: 'Steel bucket handles', category: 'Components', unit: 'pcs', qty: 2400, min: 1000, cost: 35, supplier: 'sp4', location: 'Store C-2' },
  { id: 'rm7', sku: 'RM-CAP-01', name: 'Screw caps', category: 'Components', unit: 'pcs', qty: 9200, min: 5000, cost: 6, supplier: 'sp4', location: 'Store C-3' },
  { id: 'rm8', sku: 'RM-LBL-01', name: 'Printed labels', category: 'Packaging', unit: 'pcs', qty: 3100, min: 4000, cost: 2, supplier: 'sp3', location: 'Store D-1' },
  { id: 'rm9', sku: 'RM-CTN-01', name: 'Corrugated cartons', category: 'Packaging', unit: 'pcs', qty: 640, min: 300, cost: 85, supplier: 'sp3', location: 'Store D-2' },
  { id: 'rm10', sku: 'RM-FLM-01', name: 'Stretch film roll', category: 'Packaging', unit: 'rolls', qty: 18, min: 10, cost: 1800, supplier: 'sp3', location: 'Store D-3' },
  { id: 'rm11', sku: 'RM-MRS-01', name: 'Mould release spray', category: 'Consumables', unit: 'cans', qty: 9, min: 12, cost: 650, supplier: 'sp4', location: 'Maintenance' },
  { id: 'rm12', sku: 'RM-TPE-01', name: 'Packing tape', category: 'Consumables', unit: 'rolls', qty: 140, min: 60, cost: 120, supplier: 'sp3', location: 'Store D-3' },
]

const g = (a, b) => `linear-gradient(135deg, ${a}, ${b})`

export const PRODUCTS = [
  { id: 'p1', sku: 'FG-CHR-01', name: 'Classic Chair', category: 'Furniture', emoji: '🪑', bg: g('#bfdbfe', '#2563eb'), price: 1450, qty: 420, min: 150, bom: [{ m: 'rm1', q: 2.2 }, { m: 'rm4', q: 0.05 }, { m: 'rm9', q: 0.25 }] },
  { id: 'p2', sku: 'FG-TBL-01', name: 'Dining Table', category: 'Furniture', emoji: '🍽️', bg: g('#e0e7ff', '#4f46e5'), price: 3800, qty: 64, min: 40, bom: [{ m: 'rm1', q: 4.5 }, { m: 'rm5', q: 0.08 }, { m: 'rm9', q: 1 }] },
  { id: 'p3', sku: 'FG-BKT-20', name: 'Bucket 20L', category: 'Household', emoji: '🪣', bg: g('#bae6fd', '#0284c7'), price: 650, qty: 880, min: 300, bom: [{ m: 'rm2', q: 0.9 }, { m: 'rm6', q: 1 }, { m: 'rm4', q: 0.02 }, { m: 'rm8', q: 1 }] },
  { id: 'p4', sku: 'FG-BOX-30', name: 'Storage Box 30L', category: 'Household', emoji: '📦', bg: g('#fef3c7', '#d97706'), price: 980, qty: 210, min: 120, bom: [{ m: 'rm1', q: 1.4 }, { m: 'rm5', q: 0.03 }, { m: 'rm8', q: 1 }] },
  { id: 'p5', sku: 'FG-DST-40', name: 'Dustbin 40L', category: 'Household', emoji: '🗑️', bg: g('#d1fae5', '#059669'), price: 1350, qty: 96, min: 100, bom: [{ m: 'rm2', q: 1.6 }, { m: 'rm4', q: 0.03 }, { m: 'rm8', q: 1 }] },
  { id: 'p6', sku: 'FG-CRT-01', name: 'Industrial Crate', category: 'Industrial', emoji: '🧺', bg: g('#fecaca', '#dc2626'), price: 1200, qty: 350, min: 200, bom: [{ m: 'rm2', q: 1.8 }, { m: 'rm4', q: 0.03 }] },
  { id: 'p7', sku: 'FG-JRC-20', name: 'Jerry Can 20L', category: 'Bottles & Cans', emoji: '🛢️', bg: g('#e7e5e4', '#57534e'), price: 720, qty: 540, min: 250, bom: [{ m: 'rm2', q: 1.1 }, { m: 'rm7', q: 1 }, { m: 'rm8', q: 1 }] },
  { id: 'p8', sku: 'FG-BTL-01', name: 'Water Bottle 1L', category: 'Bottles & Cans', emoji: '🧴', bg: g('#cffafe', '#0891b2'), price: 90, qty: 6200, min: 3000, bom: [{ m: 'rm3', q: 0.04 }, { m: 'rm7', q: 1 }, { m: 'rm8', q: 1 }] },
]

export const CUSTOMERS = [
  { id: 'c1', name: 'City Traders', city: 'Lahore', phone: '0300-1111111' },
  { id: 'c2', name: 'Green Valley Stores', city: 'Islamabad', phone: '0301-2222222' },
  { id: 'c3', name: 'Hamza Distributors', city: 'Faisalabad', phone: '0302-3333333' },
  { id: 'c4', name: 'Prime Wholesale', city: 'Karachi', phone: '0303-4444444' },
  { id: 'c5', name: 'Northern Home Supplies', city: 'Peshawar', phone: '0304-5555555' },
  { id: 'c6', name: 'Riverside Mart', city: 'Multan', phone: '0305-6666666' },
]

export const SUPPLIERS = [
  { id: 'sp1', name: 'Polymer Supply Co.', city: 'Karachi', phone: '021-1112222' },
  { id: 'sp2', name: 'ColorTech Masterbatch', city: 'Lahore', phone: '042-3334444' },
  { id: 'sp3', name: 'PackRight Cartons', city: 'Lahore', phone: '042-5556666' },
  { id: 'sp4', name: 'Allied Components', city: 'Sialkot', phone: '052-7778888' },
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
      const qty = p.id === 'p8' ? 200 + Math.floor(r() * 10) * 100 : 10 + Math.floor(r() * 12) * 5
      items.push({ id: p.id, name: p.name, qty, price: p.price })
    }
    const age = d
    const status = age > 14 ? (r() < 0.06 ? 'cancelled' : 'delivered') : age > 7 ? ['dispatched', 'delivered', 'delivered'][Math.floor(r() * 3)] : age > 3 ? ['in_production', 'ready', 'dispatched'][Math.floor(r() * 3)] : ['pending', 'in_production'][Math.floor(r() * 2)]
    const customer = CUSTOMERS[Math.floor(r() * CUSTOMERS.length)].id
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0)
    const tax = Math.round(subtotal * 0.17)
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
    const items = mats.slice(0, 1 + Math.floor(r() * Math.min(3, mats.length))).map((m) => ({ id: m.id, name: m.name, qty: m.unit === 'kg' ? 250 + Math.floor(r() * 6) * 50 : m.unit === 'pcs' ? 1000 + Math.floor(r() * 5) * 500 : 10 + Math.floor(r() * 4) * 5, price: m.cost }))
    const status = d > 6 ? 'received' : d > 2 ? 'ordered' : 'draft'
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0)
    const tax = Math.round(subtotal * 0.17)
    const order = { id: `po${po}`, number: `PO-${po}`, type: 'purchase', party: sp.id, items, subtotal, tax, total: subtotal + tax, status, createdAt: created, dueDate: created + 5 * DAY, notes: '' }
    orders.push(order)
    log({ at: created, kind: 'order', action: 'Purchase order created', ref: order.number, detail: `${sp.name} · Rs ${order.total.toLocaleString()}`, user: 'Sana Iqbal' })
    if (status === 'received') items.forEach((i) => log({ at: created + 3 * DAY, kind: 'stock_in', action: 'Received', ref: order.number, item: i.name, qty: i.qty, detail: 'Raw material received', user: 'Sana Iqbal' }))
    po++
  }

  // production runs
  for (let d = 58; d >= 0; d -= 1 + Math.floor(r() * 3)) {
    const p = PRODUCTS[Math.floor(r() * PRODUCTS.length)]
    const qty = p.id === 'p8' ? 1000 + Math.floor(r() * 5) * 500 : 50 + Math.floor(r() * 6) * 25
    const at = now - d * DAY + 10 * 3600000
    log({ at, kind: 'production', action: 'Production completed', ref: `BATCH-${String(9000 + h).slice(-4)}`, item: p.name, qty, detail: `Materials consumed per BOM`, user: 'Bilal Khan' })
  }

  history.sort((a, b) => b.at - a.at)
  return { orders, history, nextSO: so, nextPO: po, nextH: h }
}
