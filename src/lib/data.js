// Demo seed data for Factora. Everything can be edited in the app (Settings → Reset restores this).

export const DEFAULT_SETTINGS = {
  companyName: 'Golden Harvest Foods Ltd.',
  tagline: 'Bakery, snacks, beverages & sauces',
  address: 'Plot 12, Industrial Estate, Lahore',
  phone: '+92 42 0000000',
  email: 'info@goldenharvest.example',
  currency: 'Rs',
  taxRate: 17,
  lowStockAlerts: true,
  orderPrefix: 'SO',
  purchasePrefix: 'PO',
}

export const MATERIAL_CATEGORIES = ['Grains & Flour', 'Sweeteners', 'Oils & Dairy', 'Fruits & Vegetables', 'Spices & Salt', 'Packaging']
export const PRODUCT_CATEGORIES = ['Bakery', 'Snacks', 'Beverages', 'Sauces & Spreads']

export const MATERIALS = [
  { id: 'rm1', sku: 'RM-FLR-01', name: 'Wheat flour', category: 'Grains & Flour', unit: 'kg', qty: 2400, min: 1000, cost: 110, supplier: 'sp1', location: 'Dry store A-1' },
  { id: 'rm2', sku: 'RM-BSN-01', name: 'Gram flour (besan)', category: 'Grains & Flour', unit: 'kg', qty: 380, min: 300, cost: 260, supplier: 'sp1', location: 'Dry store A-2' },
  { id: 'rm3', sku: 'RM-SUG-01', name: 'Sugar', category: 'Sweeteners', unit: 'kg', qty: 1500, min: 800, cost: 150, supplier: 'sp2', location: 'Dry store A-3' },
  { id: 'rm4', sku: 'RM-OIL-01', name: 'Cooking oil', category: 'Oils & Dairy', unit: 'L', qty: 420, min: 500, cost: 520, supplier: 'sp4', location: 'Oil tank 1' },
  { id: 'rm5', sku: 'RM-BTR-01', name: 'Butter', category: 'Oils & Dairy', unit: 'kg', qty: 160, min: 100, cost: 1800, supplier: 'sp4', location: 'Cold room C-1' },
  { id: 'rm6', sku: 'RM-MLK-01', name: 'Milk powder', category: 'Oils & Dairy', unit: 'kg', qty: 85, min: 120, cost: 1400, supplier: 'sp4', location: 'Dry store B-1' },
  { id: 'rm7', sku: 'RM-POT-01', name: 'Potatoes', category: 'Fruits & Vegetables', unit: 'kg', qty: 900, min: 600, cost: 90, supplier: 'sp3', location: 'Cold room C-2' },
  { id: 'rm8', sku: 'RM-TOM-01', name: 'Tomato paste', category: 'Fruits & Vegetables', unit: 'kg', qty: 260, min: 150, cost: 450, supplier: 'sp3', location: 'Cold room C-3' },
  { id: 'rm9', sku: 'RM-MNG-01', name: 'Mango pulp', category: 'Fruits & Vegetables', unit: 'kg', qty: 340, min: 200, cost: 380, supplier: 'sp3', location: 'Cold room C-3' },
  { id: 'rm10', sku: 'RM-FRT-01', name: 'Mixed fruit pulp', category: 'Fruits & Vegetables', unit: 'kg', qty: 140, min: 150, cost: 420, supplier: 'sp3', location: 'Cold room C-3' },
  { id: 'rm11', sku: 'RM-SLT-01', name: 'Salt', category: 'Spices & Salt', unit: 'kg', qty: 300, min: 100, cost: 60, supplier: 'sp6', location: 'Dry store B-2' },
  { id: 'rm12', sku: 'RM-SPC-01', name: 'Spice mix', category: 'Spices & Salt', unit: 'kg', qty: 48, min: 30, cost: 1600, supplier: 'sp6', location: 'Dry store B-2' },
  { id: 'rm13', sku: 'PK-PCH-01', name: 'Snack pouches', category: 'Packaging', unit: 'pcs', qty: 18000, min: 10000, cost: 6, supplier: 'sp5', location: 'Pack store D-1' },
  { id: 'rm14', sku: 'PK-BTL-01', name: 'PET bottles', category: 'Packaging', unit: 'pcs', qty: 2600, min: 2000, cost: 28, supplier: 'sp5', location: 'Pack store D-2' },
  { id: 'rm15', sku: 'PK-JAR-01', name: 'Glass jars', category: 'Packaging', unit: 'pcs', qty: 1100, min: 1500, cost: 45, supplier: 'sp5', location: 'Pack store D-2' },
  { id: 'rm16', sku: 'PK-LBL-01', name: 'Printed labels', category: 'Packaging', unit: 'pcs', qty: 9000, min: 5000, cost: 2, supplier: 'sp5', location: 'Pack store D-3' },
  { id: 'rm17', sku: 'PK-CTN-01', name: 'Shipping cartons', category: 'Packaging', unit: 'pcs', qty: 700, min: 300, cost: 85, supplier: 'sp5', location: 'Pack store D-3' },
]

const g = (a, b) => `linear-gradient(135deg, ${a}, ${b})`

export const PRODUCTS = [
  { id: 'p1', sku: 'FG-CKE-200', name: 'Butter Cookies 200g', category: 'Bakery', emoji: '🍪', bg: g('#fef3c7', '#d97706'), price: 220, qty: 1800, min: 800, bom: [{ m: 'rm1', q: 0.1 }, { m: 'rm3', q: 0.04 }, { m: 'rm5', q: 0.03 }, { m: 'rm13', q: 1 }, { m: 'rm17', q: 0.04 }] },
  { id: 'p2', sku: 'FG-CHB-150', name: 'Chocolate Biscuits 150g', category: 'Bakery', emoji: '🍫', bg: g('#e7e5e4', '#78350f'), price: 180, qty: 2400, min: 1000, bom: [{ m: 'rm1', q: 0.08 }, { m: 'rm3', q: 0.04 }, { m: 'rm6', q: 0.01 }, { m: 'rm5', q: 0.01 }, { m: 'rm13', q: 1 }] },
  { id: 'p3', sku: 'FG-BRD-01', name: 'Sandwich Bread', category: 'Bakery', emoji: '🍞', bg: g('#ffedd5', '#c2410c'), price: 160, qty: 320, min: 400, bom: [{ m: 'rm1', q: 0.4 }, { m: 'rm3', q: 0.02 }, { m: 'rm4', q: 0.02 }, { m: 'rm11', q: 0.005 }, { m: 'rm13', q: 1 }] },
  { id: 'p4', sku: 'FG-CHP-50', name: 'Potato Chips 50g', category: 'Snacks', emoji: '🥔', bg: g('#fef08a', '#ca8a04'), price: 70, qty: 5200, min: 2000, bom: [{ m: 'rm7', q: 0.2 }, { m: 'rm4', q: 0.02 }, { m: 'rm12', q: 0.002 }, { m: 'rm11', q: 0.001 }, { m: 'rm13', q: 1 }] },
  { id: 'p5', sku: 'FG-NMK-200', name: 'Nimko Mix 200g', category: 'Snacks', emoji: '🥜', bg: g('#fde68a', '#b45309'), price: 150, qty: 1100, min: 600, bom: [{ m: 'rm2', q: 0.1 }, { m: 'rm4', q: 0.03 }, { m: 'rm12', q: 0.01 }, { m: 'rm11', q: 0.003 }, { m: 'rm13', q: 1 }] },
  { id: 'p6', sku: 'FG-MJC-1L', name: 'Mango Juice 1L', category: 'Beverages', emoji: '🥭', bg: g('#fed7aa', '#ea580c'), price: 260, qty: 1500, min: 800, bom: [{ m: 'rm9', q: 0.35 }, { m: 'rm3', q: 0.08 }, { m: 'rm14', q: 1 }, { m: 'rm16', q: 1 }] },
  { id: 'p7', sku: 'FG-KTC-500', name: 'Tomato Ketchup 500g', category: 'Sauces & Spreads', emoji: '🍅', bg: g('#fecaca', '#dc2626'), price: 290, qty: 900, min: 500, bom: [{ m: 'rm8', q: 0.3 }, { m: 'rm3', q: 0.06 }, { m: 'rm11', q: 0.01 }, { m: 'rm12', q: 0.005 }, { m: 'rm14', q: 1 }, { m: 'rm16', q: 1 }] },
  { id: 'p8', sku: 'FG-JAM-440', name: 'Mixed Fruit Jam 440g', category: 'Sauces & Spreads', emoji: '🍓', bg: g('#fbcfe8', '#be185d'), price: 380, qty: 380, min: 300, bom: [{ m: 'rm10', q: 0.25 }, { m: 'rm3', q: 0.2 }, { m: 'rm15', q: 1 }, { m: 'rm16', q: 1 }] },
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
  { id: 'sp1', name: 'Punjab Flour Mills', city: 'Lahore', phone: '042-1112222' },
  { id: 'sp2', name: 'Sweet Valley Sugar', city: 'Faisalabad', phone: '041-3334444' },
  { id: 'sp3', name: 'Agro Fresh Produce', city: 'Multan', phone: '061-5556666' },
  { id: 'sp4', name: 'Dairy & Oils Co.', city: 'Karachi', phone: '021-7778888' },
  { id: 'sp5', name: 'PackRight Packaging', city: 'Lahore', phone: '042-9990000' },
  { id: 'sp6', name: 'SpiceHouse Traders', city: 'Karachi', phone: '021-2223333' },
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
      const qty = 100 + Math.floor(r() * 18) * 50
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
    const items = mats.slice(0, 1 + Math.floor(r() * Math.min(3, mats.length))).map((m) => ({ id: m.id, name: m.name, qty: m.unit === 'kg' || m.unit === 'L' ? (m.cost > 1000 ? 25 + Math.floor(r() * 4) * 25 : 200 + Math.floor(r() * 7) * 50) : 1000 + Math.floor(r() * 6) * 500, price: m.cost }))
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
    const qty = 500 + Math.floor(r() * 8) * 250
    const at = now - d * DAY + 10 * 3600000
    log({ at, kind: 'production', action: 'Production completed', ref: `BATCH-${String(9000 + h).slice(-4)}`, item: p.name, qty, detail: `Materials consumed per BOM`, user: 'Bilal Khan' })
  }

  history.sort((a, b) => b.at - a.at)
  return { orders, history, nextSO: so, nextPO: po, nextH: h }
}
