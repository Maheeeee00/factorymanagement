import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Plus, Search, Download, ArrowDownToLine, ArrowUpFromLine, Pencil, Trash2, Boxes, AlertTriangle, Wallet, Package } from 'lucide-react'
import { useStore, useMoney, fmtQty, productCost, toCSV, download } from '../lib/store'
import { PageHead, Tabs, StockBadge, Modal, Field, ConfirmButton, Empty, toast } from '../components/ui'

const BLANK = { sku: '', name: '', category: 'Grains & Flour', unit: 'kg', qty: 0, min: 0, cost: 0, supplier: '', location: '' }

export default function Inventory() {
  const { state, dispatch } = useStore()
  const money = useMoney()
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') === 'finished' ? 'finished' : 'raw'
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [lowOnly, setLowOnly] = useState(false)
  const [adjust, setAdjust] = useState(null) // { item, kind, dir }
  const [edit, setEdit] = useState(null)

  const isRaw = tab === 'raw'
  const source = isRaw ? state.materials : state.products.map((p) => ({ ...p, unit: 'pcs', cost: productCost(p, state.materials) }))
  const cats = isRaw ? state.materialCategories : state.productCategories
  const rows = useMemo(() => source.filter((i) =>
    (cat === 'all' || i.category === cat) &&
    (!lowOnly || i.qty < i.min) &&
    `${i.name} ${i.sku} ${i.location || ''}`.toLowerCase().includes(q.toLowerCase())), [source, cat, lowOnly, q])

  const value = source.reduce((s, i) => s + i.qty * i.cost, 0)
  const low = source.filter((i) => i.qty < i.min).length

  const exportCsv = () => {
    const head = ['SKU', 'Name', 'Category', 'Unit', 'In stock', 'Minimum', 'Unit cost', 'Value', 'Location']
    download(`inventory-${tab}.csv`, toCSV([head, ...rows.map((i) => [i.sku, i.name, i.category, i.unit, i.qty, i.min, Math.round(i.cost), Math.round(i.qty * i.cost), i.location || ''])]))
  }

  return (
    <div>
      <PageHead title="Inventory" sub="Raw materials and finished goods in stock">
        <button onClick={exportCsv} className="btn-ghost"><Download className="h-4 w-4" />Export</button>
        {isRaw && <button onClick={() => setEdit({ ...BLANK, supplier: state.suppliers[0]?.id || '' })} className="btn-primary"><Plus className="h-4 w-4" />Add material</button>}
      </PageHead>

      <div className="mb-5 grid grid-cols-3 gap-2 sm:mb-6 sm:gap-4">
        {[[isRaw ? Boxes : Package, isRaw ? 'Materials' : 'Products', source.length, 'from-brand-500 to-indigo-600'], [AlertTriangle, 'Below minimum', low, 'from-amber-500 to-orange-500'], [Wallet, 'Stock value', <><span className="sm:hidden">{state.settings.currency} {value >= 1e6 ? `${(value / 1e6).toFixed(2)}M` : `${Math.round(value / 1000)}k`}</span><span className="hidden sm:inline">{money(value)}</span></>, 'from-emerald-500 to-teal-500']].map(([Icon, l, v, gr]) => (
          <div key={l} className="card flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br sm:h-12 sm:w-12 sm:rounded-2xl ${gr} text-white shadow-lg`}><Icon className="h-5 w-5 sm:h-6 sm:w-6" /></span>
            <div className="min-w-0"><p className="truncate text-[11px] text-slate-500 sm:text-sm">{l}</p><p className="truncate font-display text-base font-extrabold text-ink-900 sm:text-2xl">{v}</p></div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4">
          <Tabs value={tab} onChange={(t) => { setParams(t === 'finished' ? { tab: 'finished' } : {}); setCat('all') }} tabs={[['raw', 'Raw materials', state.materials.length], ['finished', 'Finished goods', state.products.length]]} />
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} className="input pl-9" placeholder="Search name, SKU or location" />
          </div>
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="input w-auto">
            <option value="all">All categories</option>
            {cats.map((c) => <option key={c}>{c}</option>)}
          </select>
          <label className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-slate-600"><input type="checkbox" checked={lowOnly} onChange={(e) => setLowOnly(e.target.checked)} className="h-4 w-4 accent-brand-600" />Low stock only</label>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-slate-100 md:hidden">
          {rows.map((i) => {
            const ratio = Math.min(1, i.qty / Math.max(1, i.min * 2))
            const isLow = i.qty < i.min
            return (
              <div key={i.id} className="p-4">
                <div className="flex items-start gap-3">
                  {!isRaw && <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xl" style={{ background: i.bg }}>{i.emoji}</span>}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink-900">{i.name}</p>
                    <p className="truncate text-xs text-slate-500">{i.sku} · {i.category}{i.location ? ` · ${i.location}` : ''}</p>
                  </div>
                  <StockBadge qty={i.qty} min={i.min} />
                </div>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <div><p className="font-display text-xl font-extrabold text-ink-900">{fmtQty(i.qty)} <span className="text-sm font-semibold text-slate-500">{i.unit}</span></p><p className="text-xs text-slate-500">Min {fmtQty(i.min)} · {money(i.qty * i.cost)}</p></div>
                  <div className="flex gap-1.5">
                    <button onClick={() => setAdjust({ item: i, kind: isRaw ? 'material' : 'product', dir: 1 })} className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" aria-label="Stock in"><ArrowDownToLine className="h-4 w-4" /></button>
                    <button onClick={() => setAdjust({ item: i, kind: isRaw ? 'material' : 'product', dir: -1 })} className="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-700 ring-1 ring-rose-200" aria-label="Stock out"><ArrowUpFromLine className="h-4 w-4" /></button>
                    {isRaw && <button onClick={() => setEdit(i)} className="grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-600 ring-1 ring-slate-200" aria-label="Edit"><Pencil className="h-4 w-4" /></button>}
                  </div>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-slate-100"><div className={`h-full rounded-full ${isLow ? 'bg-amber-500' : ratio < 0.7 ? 'bg-sky-400' : 'bg-emerald-500'}`} style={{ width: `${Math.max(3, ratio * 100)}%` }} /></div>
              </div>
            )
          })}
          {rows.length === 0 && <Empty icon={Boxes} title="No items found" text="Try a different search or filter" />}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-sm">
            <thead className="bg-slate-50"><tr><th className="th">Item</th><th className="th">Category</th><th className="th">Level</th><th className="th text-right">In stock</th><th className="th text-right">Min</th><th className="th text-right">Unit cost</th><th className="th text-right">Value</th><th className="th">Status</th><th className="th text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((i) => {
                const ratio = Math.min(1, i.qty / Math.max(1, i.min * 2))
                const isLow = i.qty < i.min
                return (
                  <tr key={i.id} className="hover:bg-slate-50/60">
                    <td className="td">
                      <div className="flex items-center gap-3">
                        {!isRaw && <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-lg" style={{ background: i.bg }}>{i.emoji}</span>}
                        <div><p className="font-semibold text-ink-900">{i.name}</p><p className="text-xs text-slate-500">{i.sku}{i.location ? ` · ${i.location}` : ''}</p></div>
                      </div>
                    </td>
                    <td className="td text-slate-600">{i.category}</td>
                    <td className="td w-36"><div className="h-2 rounded-full bg-slate-100"><div className={`h-full rounded-full ${isLow ? 'bg-amber-500' : ratio < 0.7 ? 'bg-sky-400' : 'bg-emerald-500'}`} style={{ width: `${Math.max(3, ratio * 100)}%` }} /></div></td>
                    <td className="td text-right font-bold">{fmtQty(i.qty)} <span className="font-normal text-slate-500">{i.unit}</span></td>
                    <td className="td text-right text-slate-500">{fmtQty(i.min)}</td>
                    <td className="td text-right text-slate-600">{money(i.cost)}</td>
                    <td className="td text-right font-semibold">{money(i.qty * i.cost)}</td>
                    <td className="td"><StockBadge qty={i.qty} min={i.min} /></td>
                    <td className="td">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => setAdjust({ item: i, kind: isRaw ? 'material' : 'product', dir: 1 })} title="Stock in" className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"><ArrowDownToLine className="h-4 w-4" /></button>
                        <button onClick={() => setAdjust({ item: i, kind: isRaw ? 'material' : 'product', dir: -1 })} title="Stock out" className="rounded-lg p-2 text-rose-600 hover:bg-rose-50"><ArrowUpFromLine className="h-4 w-4" /></button>
                        {isRaw && <button onClick={() => setEdit(i)} title="Edit" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button>}
                        {isRaw && <ConfirmButton onConfirm={() => { dispatch({ type: 'DELETE_MATERIAL', id: i.id }); toast(`${i.name} deleted`) }} armedLabel="Delete?" title="Delete" className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="h-4 w-4" /></ConfirmButton>}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {rows.length === 0 && <Empty icon={Boxes} title="No items found" text="Try a different search or filter" />}
        </div>
      </div>

      <AdjustModal adjust={adjust} onClose={() => setAdjust(null)} onSave={(delta, reason) => {
        dispatch({ type: 'ADJUST', kind: adjust.kind, id: adjust.item.id, delta, reason })
        toast(`${adjust.item.name}: ${delta > 0 ? '+' : ''}${fmtQty(delta)} ${adjust.item.unit}`)
        setAdjust(null)
      }} />

      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit?.id ? 'Edit material' : 'Add raw material'}>
        {edit && (
          <form onSubmit={(e) => { e.preventDefault(); dispatch({ type: 'SAVE_MATERIAL', item: { ...edit, qty: +edit.qty, min: +edit.min, cost: +edit.cost } }); toast(edit.id ? 'Material updated' : 'Material added'); setEdit(null) }} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Name"><input required className="input" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} /></Field>
              <Field label="SKU"><input required className="input" value={edit.sku} onChange={(e) => setEdit({ ...edit, sku: e.target.value.toUpperCase() })} placeholder="RM-XXX-01" /></Field>
              <Field label="Category"><select className="input" value={edit.category} onChange={(e) => setEdit({ ...edit, category: e.target.value })}>{state.materialCategories.map((c) => <option key={c}>{c}</option>)}</select></Field>
              <Field label="Unit"><select className="input" value={edit.unit} onChange={(e) => setEdit({ ...edit, unit: e.target.value })}>{['kg', 'g', 'pcs', 'rolls', 'cans', 'L', 'm', 'boxes'].map((u) => <option key={u}>{u}</option>)}</select></Field>
              {!edit.id && <Field label="Opening stock"><input type="number" step="any" min="0" className="input" value={edit.qty} onChange={(e) => setEdit({ ...edit, qty: e.target.value })} /></Field>}
              <Field label="Minimum level"><input type="number" step="any" min="0" className="input" value={edit.min} onChange={(e) => setEdit({ ...edit, min: e.target.value })} /></Field>
              <Field label={`Unit cost (${state.settings.currency})`}><input type="number" step="any" min="0" className="input" value={edit.cost} onChange={(e) => setEdit({ ...edit, cost: e.target.value })} /></Field>
              <Field label="Supplier"><select className="input" value={edit.supplier} onChange={(e) => setEdit({ ...edit, supplier: e.target.value })}><option value="">—</option>{state.suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>
              <Field label="Location" className="sm:col-span-2"><input className="input" value={edit.location} onChange={(e) => setEdit({ ...edit, location: e.target.value })} placeholder="e.g. Dry store A-1" /></Field>
            </div>
            <button className="btn-primary w-full py-3">Save material</button>
          </form>
        )}
      </Modal>
    </div>
  )
}

function AdjustModal({ adjust, onClose, onSave }) {
  const [qty, setQty] = useState('')
  const [reason, setReason] = useState('')
  if (!adjust) return null
  const { item, dir } = adjust
  const n = Number(qty) || 0
  const reasons = dir > 0 ? ['Purchase received', 'Production return', 'Stock count correction', 'Other'] : ['Issued to production', 'Damaged / scrap', 'Sample', 'Stock count correction', 'Other']
  const after = item.qty + dir * n
  return (
    <Modal open onClose={() => { setQty(''); setReason(''); onClose() }} title={dir > 0 ? `Stock in · ${item.name}` : `Stock out · ${item.name}`}>
      <form onSubmit={(e) => { e.preventDefault(); if (n > 0) { onSave(dir * n, reason || reasons[0]); setQty(''); setReason('') } }} className="space-y-4">
        <div className="grid grid-cols-3 gap-3 rounded-2xl bg-slate-50 p-4 text-center">
          <div><p className="text-xs text-slate-500">Current</p><p className="font-display text-lg font-extrabold">{fmtQty(item.qty)}</p></div>
          <div><p className="text-xs text-slate-500">{dir > 0 ? 'Adding' : 'Removing'}</p><p className={`font-display text-lg font-extrabold ${dir > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{dir > 0 ? '+' : '−'}{fmtQty(n)}</p></div>
          <div><p className="text-xs text-slate-500">After</p><p className={`font-display text-lg font-extrabold ${after < item.min ? 'text-amber-600' : ''}`}>{fmtQty(Math.max(0, after))}</p></div>
        </div>
        <Field label={`Quantity (${item.unit})`}><input autoFocus required type="number" step="any" min="0.01" max={dir < 0 ? item.qty : undefined} className="input py-3 text-lg" value={qty} onChange={(e) => setQty(e.target.value)} /></Field>
        <Field label="Reason">
          <div className="flex flex-wrap gap-2">{reasons.map((r) => <button type="button" key={r} onClick={() => setReason(r)} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ring-1 ${(reason || reasons[0]) === r ? 'bg-brand-50 text-brand-700 ring-brand-400' : 'ring-slate-200 hover:bg-slate-50'}`}>{r}</button>)}</div>
        </Field>
        {dir < 0 && n > item.qty && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">You can't remove more than what's in stock.</p>}
        <button disabled={!n || (dir < 0 && n > item.qty)} className={`btn w-full py-3 text-white ${dir > 0 ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'}`}>{dir > 0 ? <ArrowDownToLine className="h-4 w-4" /> : <ArrowUpFromLine className="h-4 w-4" />}{dir > 0 ? 'Add to stock' : 'Remove from stock'}</button>
      </form>
    </Modal>
  )
}
