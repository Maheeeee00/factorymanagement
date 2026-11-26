import { useState } from 'react'
import { Package, Plus, Search, Hammer, Pencil, Trash2, Layers, X, CheckCircle2, AlertTriangle } from 'lucide-react'
import { useStore, useMoney, fmtQty, productCost, maxProducible } from '../lib/store'
import { PageHead, Modal, Field, ConfirmButton, StockBadge, Empty, toast } from '../components/ui'

const EMOJIS = ['🌾', '🥐', '🫓', '🟤', '🍞', '🥖', '🍚', '🌽', '🫘', '🥣', '🧺', '📦']
const BGS = ['linear-gradient(135deg,#bfdbfe,#2563eb)', 'linear-gradient(135deg,#e0e7ff,#4f46e5)', 'linear-gradient(135deg,#d1fae5,#059669)', 'linear-gradient(135deg,#fef3c7,#d97706)', 'linear-gradient(135deg,#fecaca,#dc2626)', 'linear-gradient(135deg,#e7e5e4,#57534e)', 'linear-gradient(135deg,#cffafe,#0891b2)']

export default function Products() {
  const { state, dispatch } = useStore()
  const money = useMoney()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [edit, setEdit] = useState(null)
  const [produce, setProduce] = useState(null)
  const items = state.products.filter((p) => (cat === 'all' || p.category === cat) && `${p.name} ${p.sku}`.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <PageHead tone="orange" icon={Package} title="Products" sub="Finished goods catalogue, bills of materials and production" stats={[['Products', state.products.length], ['Bags in stock', fmtQty(state.products.reduce((a, p) => a + p.qty, 0))], ['Avg. margin', `${Math.round(state.products.reduce((a, p) => a + (p.price ? ((p.price - productCost(p, state.materials)) / p.price) * 100 : 0), 0) / Math.max(1, state.products.length))}%`]]}>
        <button onClick={() => setEdit({ sku: '', name: '', category: state.productCategories[0], emoji: '🌾', bg: BGS[3], price: '', qty: 0, min: 0, bom: [] })} className="btn-primary"><Plus className="h-4 w-4" />Add product</button>
      </PageHead>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} className="input ps-9" placeholder="Search products" />
        </div>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {['all', ...state.productCategories].map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${cat === c ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg' : 'bg-white ring-1 ring-slate-200 hover:bg-slate-50'}`}>{c === 'all' ? 'All' : c}</button>
          ))}
        </div>
      </div>

      <div className="stagger grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {items.map((p) => {
          const cost = productCost(p, state.materials)
          const margin = p.price ? ((p.price - cost) / p.price) * 100 : 0
          const canMake = maxProducible(p, state.materials)
          return (
            <div key={p.id} className="card lift group flex flex-col overflow-hidden">
              <div className="relative grid h-32 place-items-center overflow-hidden text-6xl" style={{ background: p.bg }}>
                <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/25 blur-xl" />
                <span className="drop-shadow-xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-125">{p.emoji}</span>
                <span className="absolute left-3 top-3 chip bg-white/90 text-slate-700">{p.category}</span>
                <span className="absolute right-3 top-3"><StockBadge qty={p.qty} min={p.min} /></span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <div><p className="font-bold text-ink-900">{p.name}</p><p className="text-xs text-slate-500">{p.sku}</p></div>
                  <p className="font-bold text-brand-700">{money(p.price)}</p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3 text-center text-xs">
                  <div><p className="text-slate-500">In stock</p><p className="mt-0.5 font-display text-base font-extrabold text-ink-900">{fmtQty(p.qty)}</p></div>
                  <div><p className="text-slate-500">Unit cost</p><p className="mt-0.5 font-display text-base font-extrabold text-ink-900">{Math.round(cost).toLocaleString()}</p></div>
                  <div><p className="text-slate-500">Margin</p><p className={`mt-0.5 font-display text-base font-extrabold ${margin >= 30 ? 'text-emerald-600' : margin >= 10 ? 'text-amber-600' : 'text-rose-600'}`}>{margin.toFixed(0)}%</p></div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500"><Layers className="h-3.5 w-3.5" />{p.bom.length} materials · can make <b className="text-ink-900">{fmtQty(canMake)}</b> more</div>
                <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
                  <button onClick={() => setProduce(p)} className="btn-primary flex-1 py-2"><Hammer className="h-4 w-4" />Produce</button>
                  <button onClick={() => setEdit(p)} className="btn-ghost px-3 py-2" title="Edit"><Pencil className="h-4 w-4" /></button>
                  <ConfirmButton onConfirm={() => { dispatch({ type: 'DELETE_PRODUCT', id: p.id }); toast(`${p.name} deleted`) }} armedLabel="Delete?" title="Delete" className="btn-ghost px-3 py-2 text-rose-600"><Trash2 className="h-4 w-4" /></ConfirmButton>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {items.length === 0 && <div className="card"><Empty icon={Layers} title="No products found" /></div>}

      <ProduceModal product={produce} onClose={() => setProduce(null)} />
      <EditModal item={edit} setItem={setEdit} />
    </div>
  )
}

function ProduceModal({ product, onClose }) {
  const { state, dispatch } = useStore()
  const [qty, setQty] = useState('')
  if (!product) return null
  const n = Number(qty) || 0
  const lines = product.bom.map((b) => { const m = state.materials.find((x) => x.id === b.m); const need = b.q * n; return { m, need, ok: m && m.qty >= need } })
  const ok = n > 0 && lines.every((l) => l.ok)
  const max = maxProducible(product, state.materials)
  const close = () => { setQty(''); onClose() }
  return (
    <Modal open onClose={close} title={`Produce · ${product.name}`}>
      <form onSubmit={(e) => { e.preventDefault(); if (!ok) return; dispatch({ type: 'PRODUCE', id: product.id, qty: n }); toast(`Produced ${fmtQty(n)} × ${product.name}`); close() }} className="space-y-4">
        <Field label="Quantity to produce (bags)">
          <div className="flex gap-2">
            <input autoFocus required type="number" min="1" step="1" className="input py-3 text-lg" value={qty} onChange={(e) => setQty(e.target.value)} />
            <button type="button" onClick={() => setQty(String(max))} className="btn-ghost shrink-0">Max {fmtQty(max)}</button>
          </div>
        </Field>
        <div className="rounded-2xl ring-1 ring-slate-200">
          <p className="border-b border-slate-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Materials required</p>
          {lines.map(({ m, need, ok: lineOk }, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5 text-sm">
              {n === 0 ? <span className="h-4 w-4" /> : lineOk ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <AlertTriangle className="h-4 w-4 text-rose-500" />}
              <span className="flex-1 font-medium">{m?.name || 'Unknown material'}</span>
              <span className={`font-semibold ${n && !lineOk ? 'text-rose-600' : ''}`}>{fmtQty(+need.toFixed(2))}</span>
              <span className="w-28 text-right text-xs text-slate-500">of {fmtQty(m?.qty || 0)} {m?.unit}</span>
            </div>
          ))}
          {!product.bom.length && <p className="px-4 py-3 text-sm text-slate-500">No bill of materials set. Edit the product to add materials.</p>}
        </div>
        {n > 0 && !ok && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">Not enough material for this quantity. Reduce the quantity or receive stock first.</p>}
        <button disabled={!ok} className="btn-primary w-full py-3"><Hammer className="h-4 w-4" />Complete production</button>
        <p className="text-center text-xs text-slate-500">Materials are deducted and finished stock is added. Logged in History.</p>
      </form>
    </Modal>
  )
}

function EditModal({ item, setItem }) {
  const { state, dispatch } = useStore()
  const money = useMoney()
  if (!item) return null
  const set = (k, v) => setItem({ ...item, [k]: v })
  const cost = productCost(item, state.materials)
  const save = (e) => {
    e.preventDefault()
    dispatch({ type: 'SAVE_PRODUCT', item: { ...item, price: +item.price, qty: +item.qty, min: +item.min, bom: item.bom.filter((b) => b.m && +b.q > 0).map((b) => ({ m: b.m, q: +b.q })) } })
    toast(item.id ? 'Product updated' : 'Product added')
    setItem(null)
  }
  return (
    <Modal open onClose={() => setItem(null)} title={item.id ? 'Edit product' : 'New product'} wide>
      <form onSubmit={save} className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="grid h-28 w-full shrink-0 place-items-center rounded-2xl text-6xl sm:w-36" style={{ background: item.bg }}>{item.emoji}</div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap gap-1.5">{EMOJIS.map((e) => <button type="button" key={e} onClick={() => set('emoji', e)} className={`grid h-9 w-9 place-items-center rounded-lg text-xl ${item.emoji === e ? 'bg-brand-100 ring-2 ring-brand-500' : 'bg-slate-100'}`}>{e}</button>)}</div>
            <div className="flex gap-2">{BGS.map((b) => <button type="button" key={b} onClick={() => set('bg', b)} className={`h-7 w-7 rounded-full ${item.bg === b ? 'ring-2 ring-ink-900 ring-offset-2' : ''}`} style={{ background: b }} />)}</div>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Name" className="sm:col-span-2"><input required className="input" value={item.name} onChange={(e) => set('name', e.target.value)} /></Field>
          <Field label="SKU"><input required className="input" value={item.sku} onChange={(e) => set('sku', e.target.value.toUpperCase())} placeholder="FG-XXX-01" /></Field>
          <Field label="Category"><select className="input" value={item.category} onChange={(e) => set('category', e.target.value)}>{state.productCategories.map((c) => <option key={c}>{c}</option>)}</select></Field>
          <Field label={`Selling price (${state.settings.currency})`}><input required type="number" min="0" className="input" value={item.price} onChange={(e) => set('price', e.target.value)} /></Field>
          <Field label="Minimum stock"><input type="number" min="0" className="input" value={item.min} onChange={(e) => set('min', e.target.value)} /></Field>
          {!item.id && <Field label="Opening stock"><input type="number" min="0" className="input" value={item.qty} onChange={(e) => set('qty', e.target.value)} /></Field>}
        </div>

        <div className="rounded-2xl ring-1 ring-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <p className="font-bold">Bill of materials <span className="font-normal text-slate-500">· per 1 unit</span></p>
            <button type="button" onClick={() => set('bom', [...item.bom, { m: '', q: '' }])} className="btn-ghost py-1.5 text-xs"><Plus className="h-3.5 w-3.5" />Add material</button>
          </div>
          <div className="space-y-2 p-4">
            {item.bom.length === 0 && <p className="text-sm text-slate-500">No materials yet. Add the materials used to make one unit.</p>}
            {item.bom.map((b, i) => {
              const m = state.materials.find((x) => x.id === b.m)
              return (
                <div key={i} className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                  <select className="input w-full sm:flex-1" value={b.m} onChange={(e) => set('bom', item.bom.map((x, j) => (j === i ? { ...x, m: e.target.value } : x)))}>
                    <option value="">Select material…</option>
                    {state.materials.map((mm) => <option key={mm.id} value={mm.id}>{mm.name} ({mm.unit})</option>)}
                  </select>
                  <input type="number" step="any" min="0" placeholder="Qty" className="input flex-1 sm:w-28 sm:flex-none" value={b.q} onChange={(e) => set('bom', item.bom.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))} />
                  <span className="w-12 text-xs text-slate-500">{m?.unit}</span>
                  <button type="button" onClick={() => set('bom', item.bom.filter((_, j) => j !== i))} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><X className="h-4 w-4" /></button>
                </div>
              )
            })}
          </div>
          <div className="flex justify-between border-t border-slate-100 px-4 py-3 text-sm"><span className="text-slate-500">Material cost per unit</span><b>{money(cost)}{+item.price > 0 && <span className="ml-2 font-normal text-slate-500">· margin {(((+item.price - cost) / +item.price) * 100).toFixed(0)}%</span>}</b></div>
        </div>
        <button className="btn-primary w-full py-3">Save product</button>
      </form>
    </Modal>
  )
}
