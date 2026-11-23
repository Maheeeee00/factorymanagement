import { useRef, useState } from 'react'
import { Building2, Users, Truck, Database, Save, Plus, Pencil, Trash2, Download, Upload, RotateCcw, Bell, Receipt, Info } from 'lucide-react'
import { useStore } from '../lib/store'
import { PageHead, Toggle, Modal, Field, ConfirmButton, toast } from '../components/ui'

const SECTIONS = [['company', 'Company', Building2], ['parties', 'Customers & suppliers', Truck], ['users', 'Users & roles', Users], ['data', 'Data & backup', Database]]

export default function Settings() {
  const [sec, setSec] = useState('company')
  return (
    <div>
      <PageHead title="Settings" sub="Company profile, contacts, users and data" />
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="grid grid-cols-2 gap-1.5 lg:flex lg:flex-col lg:gap-1">
          {SECTIONS.map(([k, l, Icon]) => (
            <button key={k} onClick={() => setSec(k)} className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition sm:text-sm ${sec === k ? 'bg-white text-brand-700 shadow-card ring-1 ring-slate-200' : 'bg-white/50 text-slate-600 ring-1 ring-slate-200/60 hover:bg-white lg:bg-transparent lg:ring-0'}`}><Icon className="h-4 w-4" />{l}</button>
          ))}
        </nav>
        <div className="min-w-0">
          {sec === 'company' && <Company />}
          {sec === 'parties' && <Parties />}
          {sec === 'users' && <UsersSection />}
          {sec === 'data' && <DataSection />}
        </div>
      </div>
    </div>
  )
}

const Card = ({ icon: Icon, title, sub, children, action }) => (
  <div className="card mb-5 p-4 sm:p-6">
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon className="h-5 w-5" /></span>
      <div className="flex-1"><h3 className="font-bold text-ink-900">{title}</h3>{sub && <p className="text-sm text-slate-500">{sub}</p>}</div>
      {action}
    </div>
    {children}
  </div>
)

function Company() {
  const { state, dispatch } = useStore()
  const [f, setF] = useState(state.settings)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const save = () => { dispatch({ type: 'SETTINGS', patch: { ...f, taxRate: +f.taxRate } }); toast('Settings saved') }
  return (
    <>
      <Card icon={Building2} title="Company profile" sub="Shown in the sidebar and on order documents">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company name"><input className="input" value={f.companyName} onChange={set('companyName')} /></Field>
          <Field label="Tagline"><input className="input" value={f.tagline} onChange={set('tagline')} /></Field>
          <Field label="Phone"><input className="input" value={f.phone} onChange={set('phone')} /></Field>
          <Field label="Email"><input className="input" value={f.email} onChange={set('email')} /></Field>
          <Field label="Address" className="sm:col-span-2"><input className="input" value={f.address} onChange={set('address')} /></Field>
        </div>
      </Card>
      <Card icon={Receipt} title="Orders, tax & currency">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Field label="Currency"><select className="input" value={f.currency} onChange={set('currency')}>{['Rs', '$', 'AED', '€', '£', 'SAR', '₹'].map((c) => <option key={c}>{c}</option>)}</select></Field>
          <Field label="Sales tax (%)"><input type="number" min="0" className="input" value={f.taxRate} onChange={set('taxRate')} /></Field>
          <Field label="Sales order prefix"><input className="input" value={f.orderPrefix} onChange={set('orderPrefix')} /></Field>
          <Field label="Purchase order prefix"><input className="input" value={f.purchasePrefix} onChange={set('purchasePrefix')} /></Field>
        </div>
      </Card>
      <Card icon={Bell} title="Notifications">
        <div className="flex items-center justify-between">
          <div><p className="font-semibold">Low-stock alerts</p><p className="text-sm text-slate-500">Show a warning when an item drops below its minimum level</p></div>
          <Toggle on={f.lowStockAlerts} onChange={(v) => setF({ ...f, lowStockAlerts: v })} />
        </div>
      </Card>
      <div className="flex justify-end"><button onClick={save} className="btn-primary w-full sm:w-auto"><Save className="h-4 w-4" />Save changes</button></div>
    </>
  )
}

function Parties() {
  const { state, dispatch } = useStore()
  const [edit, setEdit] = useState(null)
  const block = (kind, title, list, Icon) => (
    <Card icon={Icon} title={title} sub={`${list.length} saved`} action={<button onClick={() => setEdit({ kind, item: { name: '', city: '', phone: '' } })} className="btn-ghost py-2"><Plus className="h-4 w-4" />Add</button>}>
      <div className="divide-y divide-slate-100">
        {list.map((p) => (
          <div key={p.id} className="flex items-center gap-3 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 font-bold text-slate-600">{p.name[0]}</span>
            <div className="min-w-0 flex-1"><p className="truncate font-semibold">{p.name}</p><p className="text-xs text-slate-500">{p.city} · {p.phone}</p></div>
            <button onClick={() => setEdit({ kind, item: p })} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button>
            <ConfirmButton onConfirm={() => dispatch({ type: 'DELETE_PARTY', kind, id: p.id })} armedLabel="Delete?" className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="h-4 w-4" /></ConfirmButton>
          </div>
        ))}
      </div>
    </Card>
  )
  return (
    <>
      {block('customer', 'Customers', state.customers, Users)}
      {block('supplier', 'Suppliers', state.suppliers, Truck)}
      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit ? `${edit.item.id ? 'Edit' : 'Add'} ${edit.kind}` : ''}>
        {edit && (
          <form onSubmit={(e) => { e.preventDefault(); dispatch({ type: 'SAVE_PARTY', kind: edit.kind, item: edit.item }); toast('Saved'); setEdit(null) }} className="space-y-4">
            <Field label="Name"><input required className="input" value={edit.item.name} onChange={(e) => setEdit({ ...edit, item: { ...edit.item, name: e.target.value } })} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="City"><input className="input" value={edit.item.city} onChange={(e) => setEdit({ ...edit, item: { ...edit.item, city: e.target.value } })} /></Field>
              <Field label="Phone"><input className="input" value={edit.item.phone} onChange={(e) => setEdit({ ...edit, item: { ...edit.item, phone: e.target.value } })} /></Field>
            </div>
            <button className="btn-primary w-full py-3">Save</button>
          </form>
        )}
      </Modal>
    </>
  )
}

const ROLES = ['Admin', 'Store Manager', 'Production Supervisor', 'Sales', 'Viewer']
const COLORS = ['#2550eb', '#059669', '#d97706', '#db2777', '#7c3aed', '#0891b2']
const PERMS = { Admin: 'Full access, including settings and users', 'Store Manager': 'Inventory, purchase orders, receiving stock', 'Production Supervisor': 'Products, BOM and production runs', Sales: 'Sales orders and customers', Viewer: 'Read-only access to dashboards and reports' }

function UsersSection() {
  const { state, dispatch } = useStore()
  const [edit, setEdit] = useState(null)
  return (
    <Card icon={Users} title="Users & roles" sub="Who can sign in and what they can do" action={<button onClick={() => setEdit({ name: '', email: '', role: 'Viewer', color: COLORS[state.users.length % COLORS.length] })} className="btn-ghost py-2"><Plus className="h-4 w-4" />Add user</button>}>
      <div className="divide-y divide-slate-100">
        {state.users.map((u) => (
          <div key={u.id} className="flex flex-wrap items-center gap-3 py-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl font-bold text-white" style={{ background: u.color }}>{u.name[0]}</span>
            <div className="min-w-0 flex-1"><p className="font-semibold">{u.name} {u.id === state.session.id && <span className="chip ml-1 bg-brand-50 text-brand-700">You</span>}</p><p className="text-xs text-slate-500">{u.email}</p></div>
            <div className="text-right"><span className="chip bg-slate-100 text-slate-700">{u.role}</span><p className="mt-1 hidden text-xs text-slate-500 sm:block">{PERMS[u.role]}</p></div>
            <button onClick={() => setEdit(u)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button>
            {u.id !== state.session.id && <ConfirmButton onConfirm={() => dispatch({ type: 'DELETE_USER', id: u.id })} armedLabel="Remove?" className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="h-4 w-4" /></ConfirmButton>}
          </div>
        ))}
      </div>
      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit?.id ? 'Edit user' : 'Add user'}>
        {edit && (
          <form onSubmit={(e) => { e.preventDefault(); dispatch({ type: 'SAVE_USER', item: edit }); toast('User saved'); setEdit(null) }} className="space-y-4">
            <Field label="Full name"><input required className="input" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} /></Field>
            <Field label="Email"><input required type="email" className="input" value={edit.email} onChange={(e) => setEdit({ ...edit, email: e.target.value })} /></Field>
            <Field label="Role"><select className="input" value={edit.role} onChange={(e) => setEdit({ ...edit, role: e.target.value })}>{ROLES.map((r) => <option key={r}>{r}</option>)}</select></Field>
            <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{PERMS[edit.role]}</p>
            <div className="flex gap-2">{COLORS.map((c) => <button type="button" key={c} onClick={() => setEdit({ ...edit, color: c })} className={`h-8 w-8 rounded-full ${edit.color === c ? 'ring-2 ring-ink-900 ring-offset-2' : ''}`} style={{ background: c }} />)}</div>
            <button className="btn-primary w-full py-3">Save user</button>
          </form>
        )}
      </Modal>
    </Card>
  )
}

function DataSection() {
  const { state, dispatch } = useStore()
  const fileRef = useRef(null)
  const [msg, setMsg] = useState('')
  const exportJson = () => {
    const { session, ...data } = state
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
    a.download = `factora-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
  }
  const importJson = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const r = new FileReader()
    r.onload = () => {
      try {
        const data = JSON.parse(r.result)
        if (!data.materials || !data.products || !data.orders) throw new Error('bad')
        dispatch({ type: 'REPLACE', state: { ...data, session: state.session } })
        setMsg('Backup restored successfully.'); toast('Backup restored')
      } catch { setMsg('That file is not a valid Factora backup.') }
    }
    r.readAsText(file)
    e.target.value = ''
  }
  return (
    <>
      <Card icon={Database} title="Backup & restore" sub="Download all data as a file, or restore from a backup">
        <div className="flex flex-wrap gap-2">
          <button onClick={exportJson} className="btn-ghost"><Download className="h-4 w-4" />Download backup (.json)</button>
          <button onClick={() => fileRef.current?.click()} className="btn-ghost"><Upload className="h-4 w-4" />Restore from backup</button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={importJson} />
        </div>
        {msg && <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">{msg}</p>}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[['Materials', state.materials.length], ['Products', state.products.length], ['Orders', state.orders.length], ['History entries', state.history.length]].map(([l, v]) => (
            <div key={l} className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">{l}</p><p className="font-display text-xl font-extrabold">{v.toLocaleString()}</p></div>
          ))}
        </div>
      </Card>
      <Card icon={RotateCcw} title="Reset demo data" sub="Restore the original sample factory data">
        <ConfirmButton onConfirm={() => { dispatch({ type: 'RESET' }); toast('Demo data restored') }} armedLabel="Click again to reset everything" className="btn-danger"><RotateCcw className="h-4 w-4" />Reset demo data</ConfirmButton>
      </Card>
      <Card icon={Info} title="About this installation">
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Data mode</p><p className="font-semibold">Demo: stored in this browser</p></div>
          <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Version</p><p className="font-semibold">Factora 1.0.0</p></div>
        </div>
        <p className="mt-3 text-sm text-slate-500">In demo mode each browser keeps its own copy of the data. To share live data between users and devices, connect a backend such as PocketBase or Supabase (see README).</p>
      </Card>
    </>
  )
}
