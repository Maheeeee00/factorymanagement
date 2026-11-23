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
  const alerts = [...lowMaterials.map((m) => ({ id: m.id, text: `${m.name} is low`, sub: `${m.qty} ${m.unit} left (min ${m.min})`, to: '/inventory' })), ...lowProducts.map((p) => ({ id: p.id, text: `${p.name} stock low`, sub: `${p.qty} bags left (min ${p.min})`, to: '/inventory?tab=finished' }))]
  const pendingOrders = state.orders.filter((o) => o.type === 'sales' && ['pending', 'in_production', 'ready'].includes(o.status)).length
  const user = state.session
  const current = NAV.find(([, to]) => (to === '/' ? pathname === '/' : pathname.startsWith(to)))

  const Sidebar = (
    <div className="relative flex h-full flex-col overflow-hidden bg-ink-900 text-slate-300">
      <div className="pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-brand-600/20 blur-3xl animate-blob [animation-delay:-5s]" />
      <div className="relative flex items-center justify-between p-5"><Logo dark /><button className="lg:hidden" onClick={() => setOpen(false)}><X /></button></div>
      <div className="relative mx-4 mb-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/0 p-3 ring-1 ring-white/10">
        <p className="text-[11px] uppercase tracking-wider text-slate-500">Company</p>
        <p className="truncate font-semibold text-white">{state.settings.companyName}</p>
        <p className="truncate text-xs text-slate-400">{state.settings.address}</p>
      </div>
      <nav className="relative flex-1 space-y-1 overflow-y-auto px-3">
        {NAV.map(([l, to, Icon]) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive ? 'bg-gradient-to-r from-brand-600 via-violet-600 to-fuchsia-600 anim-gradient text-white shadow-glow' : 'hover:translate-x-1 hover:bg-white/5 hover:text-white'}`}>
            <Icon className="h-5 w-5" />{l}
            {l === 'Inventory' && alerts.length > 0 && <span className="ml-auto chip bg-amber-500 text-white">{alerts.length}</span>}
            {l === 'Orders' && pendingOrders > 0 && <span className="ml-auto chip bg-white/15 text-white">{pendingOrders}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="relative m-4 flex items-center gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
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
        <header className="sticky top-0 z-30 flex items-center gap-3 overflow-visible bg-gradient-to-r from-brand-600 via-violet-600 to-fuchsia-600 anim-gradient px-4 py-3 text-white shadow-lg shadow-violet-500/20 sm:px-6">
          <button className="-ml-1 rounded-lg p-1.5 text-white hover:bg-white/15 lg:hidden" onClick={() => setOpen(true)} aria-label="Menu"><Menu /></button>
          <div className="flex min-w-0 items-center gap-2 md:hidden">
            <Logo iconOnly />
            <div className="min-w-0 leading-tight"><p className="truncate font-display text-base font-extrabold text-white">{current?.[0] || 'Factora'}</p><p className="truncate text-[11px] text-white/75">{state.settings.companyName}</p></div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) nav(`/history?q=${encodeURIComponent(q.trim())}`) }} className="relative hidden max-w-sm flex-1 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
            <input value={q} onChange={(e) => setQ(e.target.value)} className="w-full rounded-xl border-0 bg-white/15 py-2.5 pl-9 pr-3 text-sm text-white ring-1 ring-white/25 placeholder:text-white/65 backdrop-blur focus:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/60" placeholder="Search history: order no., SKU, item…" />
          </form>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-medium text-white/90 ring-1 ring-white/20 lg:flex"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" /><span className="relative h-2 w-2 rounded-full bg-emerald-400" /></span>{new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            <div className="relative">
              <button onClick={() => setBell(!bell)} className="relative rounded-xl bg-white/15 p-2.5 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/25">
                <Bell className={`h-4 w-4 ${alerts.length && state.settings.lowStockAlerts ? 'animate-wiggle [animation-iteration-count:3]' : ''}`} />
                {alerts.length > 0 && state.settings.lowStockAlerts && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white">{alerts.length}</span>}
              </button>
              {bell && (
                <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-xs animate-fadeUp text-slate-800 sm:w-80 rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-slate-200">
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
        <main className="flex-1 p-4 pb-28 sm:p-6 lg:pb-6"><div key={pathname} className="animate-fadeUp"><Outlet /></div></main>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-5">
          {NAV.slice(0, 5).map(([l, to, Icon]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `relative flex flex-col items-center gap-0.5 py-2 text-[10px] font-semibold ${isActive ? 'text-violet-700' : 'text-slate-500'}`}>
              {({ isActive }) => (
                <>
                  <span className={`relative grid h-8 w-12 place-items-center rounded-full transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-brand-600 to-violet-600 text-white shadow-glow' : ''}`}>
                    <Icon className={`h-5 w-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                    {l === 'Inventory' && alerts.length > 0 && <span className="absolute right-1 top-0 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />}
                    {l === 'Orders' && pendingOrders > 0 && <span className="absolute -right-0.5 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-fuchsia-600 px-1 text-[9px] text-white ring-2 ring-white">{pendingOrders}</span>}
                  </span>
                  {l}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
