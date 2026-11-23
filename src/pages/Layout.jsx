import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Boxes, Package, ClipboardList, History, Settings, LogOut, Menu, X, Bell, Search, AlertTriangle } from 'lucide-react'
import { useStore, timeAgo } from '../lib/store'
import { Logo } from '../components/ui'

const NAV = [
  ['Dashboard', '/', LayoutDashboard],
  ['Inventory', '/inventory', Boxes],
  ['Products', '/products', Package],
  ['Orders', '/orders', ClipboardList],
  ['History', '/history', History],
  ['Settings', '/settings', Settings],
]

export default function Layout() {
  const { state, dispatch } = useStore()
  const [open, setOpen] = useState(false)
  const [bell, setBell] = useState(false)
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0); setOpen(false); setBell(false) }, [pathname])

  const lowMaterials = state.materials.filter((m) => m.qty < m.min)
  const lowProducts = state.products.filter((p) => p.qty < p.min)
  const alerts = [...lowMaterials.map((m) => ({ id: m.id, text: `${m.name} is low`, sub: `${m.qty} ${m.unit} left (min ${m.min})`, to: '/inventory' })), ...lowProducts.map((p) => ({ id: p.id, text: `${p.name} stock low`, sub: `${p.qty} pcs left (min ${p.min})`, to: '/inventory?tab=finished' }))]
  const pendingOrders = state.orders.filter((o) => o.type === 'sales' && ['pending', 'in_production', 'ready'].includes(o.status)).length
  const user = state.session

  const Sidebar = (
    <div className="flex h-full flex-col bg-ink-900 text-slate-300">
      <div className="flex items-center justify-between p-5"><Logo dark /><button className="lg:hidden" onClick={() => setOpen(false)}><X /></button></div>
      <div className="mx-4 mb-5 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
        <p className="text-[11px] uppercase tracking-wider text-slate-500">Company</p>
        <p className="truncate font-semibold text-white">{state.settings.companyName}</p>
        <p className="truncate text-xs text-slate-400">{state.settings.address}</p>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {NAV.map(([l, to, Icon]) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive ? 'bg-brand-600 text-white shadow-glow' : 'hover:bg-white/5 hover:text-white'}`}>
            <Icon className="h-5 w-5" />{l}
            {l === 'Inventory' && alerts.length > 0 && <span className="ml-auto chip bg-amber-500 text-white">{alerts.length}</span>}
            {l === 'Orders' && pendingOrders > 0 && <span className="ml-auto chip bg-white/15 text-white">{pendingOrders}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="m-4 flex items-center gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl font-bold text-white" style={{ background: user.color }}>{user.name[0]}</span>
        <div className="min-w-0 flex-1 text-xs"><p className="truncate font-semibold text-white">{user.name}</p><p className="truncate text-slate-400">{user.role}</p></div>
        <button onClick={() => dispatch({ type: 'LOGOUT' })} title="Sign out" className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"><LogOut className="h-4 w-4" /></button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block">{Sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/60" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 animate-slideIn">{Sidebar}</div>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-xl sm:px-6">
          <button className="lg:hidden" onClick={() => setOpen(true)}><Menu /></button>
          <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) nav(`/history?q=${encodeURIComponent(q.trim())}`) }} className="relative hidden max-w-sm flex-1 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} className="input bg-slate-50 pl-9" placeholder="Search history: order no., SKU, item…" />
          </form>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden text-sm text-slate-500 sm:block">{new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            <div className="relative">
              <button onClick={() => setBell(!bell)} className="relative rounded-xl p-2.5 text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50">
                <Bell className="h-4 w-4" />
                {alerts.length > 0 && state.settings.lowStockAlerts && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white">{alerts.length}</span>}
              </button>
              {bell && (
                <div className="absolute right-0 mt-2 w-80 animate-slideIn rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-slate-200">
                  <p className="px-3 py-2 font-bold">Stock alerts</p>
                  {(!alerts.length || !state.settings.lowStockAlerts) && <p className="px-3 py-6 text-center text-sm text-slate-500">All stock levels are healthy</p>}
                  {state.settings.lowStockAlerts && alerts.slice(0, 6).map((a) => (
                    <button key={a.id} onClick={() => nav(a.to)} className="flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left hover:bg-slate-50">
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-50 text-amber-600"><AlertTriangle className="h-4 w-4" /></span>
                      <span><b className="block text-sm">{a.text}</b><span className="text-xs text-slate-500">{a.sub}</span></span>
                    </button>
                  ))}
                  {state.history[0] && <p className="border-t border-slate-100 px-3 pt-2 text-xs text-slate-400">Last activity {timeAgo(state.history[0].at)}</p>}
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6"><Outlet /></main>
      </div>
    </div>
  )
}
