import { Link } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, PieChart, Pie, Cell } from 'recharts'
import { LayoutDashboard, Wallet, ClipboardList, AlertTriangle, Factory, TrendingUp, TrendingDown, ArrowRight, PackagePlus, Plus, ArrowDownToLine, ArrowUpFromLine, Hammer, Pencil, FileText } from 'lucide-react'
import { useStore, useMoney, productCost, timeAgo, fmtDate, fmtQty, STATUS_LABEL } from '../lib/store'
import { PageHead, StatusBadge, CountUp } from '../components/ui'

const DAY = 86400000
const COLORS = ['#f59e0b', '#8b5cf6', '#0ea5e9', '#ec4899', '#10b981', '#f43f5e']
const BAR_COLORS = ['#2550eb', '#7c3aed', '#db2777', '#f97316', '#eab308', '#10b981', '#06b6d4', '#6366f1']
export const KIND_ICON = { stock_in: [ArrowDownToLine, 'bg-emerald-50 text-emerald-600'], stock_out: [ArrowUpFromLine, 'bg-rose-50 text-rose-600'], production: [Hammer, 'bg-amber-50 text-amber-600'], order: [FileText, 'bg-brand-50 text-brand-600'], edit: [Pencil, 'bg-slate-100 text-slate-600'] }

export default function Dashboard() {
  const { state } = useStore()
  const money = useMoney()
  const { materials, products, orders, history, customers } = state
  const now = Date.now()
  const startMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime()
  const startPrevMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).getTime()

  const sales = orders.filter((o) => o.type === 'sales' && o.status !== 'cancelled')
  const thisMonth = sales.filter((o) => o.createdAt >= startMonth).reduce((s, o) => s + o.total, 0)
  const elapsed = now - startMonth
  const prevSame = sales.filter((o) => o.createdAt >= startPrevMonth && o.createdAt < startPrevMonth + elapsed).reduce((s, o) => s + o.total, 0)
  const change = prevSame ? ((thisMonth - prevSame) / prevSame) * 100 : 0
  const stockValue = materials.reduce((s, m) => s + m.qty * m.cost, 0) + products.reduce((s, p) => s + p.qty * productCost(p, materials), 0)
  const open = orders.filter((o) => o.type === 'sales' && ['pending', 'in_production', 'ready'].includes(o.status))
  const lowM = materials.filter((m) => m.qty < m.min)
  const lowP = products.filter((p) => p.qty < p.min)
  const producedMonth = history.filter((h) => h.kind === 'production' && h.at >= startMonth).reduce((s, h) => s + (h.qty || 0), 0)

  const series = Array.from({ length: 30 }, (_, i) => {
    const d0 = new Date(now - (29 - i) * DAY).setHours(0, 0, 0, 0)
    const v = sales.filter((o) => o.createdAt >= d0 && o.createdAt < d0 + DAY).reduce((s, o) => s + o.total, 0)
    return { date: new Date(d0).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }), sales: v }
  })
  const prodMap = {}
  history.filter((h) => h.kind === 'production' && h.at >= now - 30 * DAY).forEach((h) => { prodMap[h.item] = (prodMap[h.item] || 0) + h.qty })
  const production = Object.entries(prodMap).map(([name, qty]) => ({ name, qty })).sort((a, b) => b.qty - a.qty).slice(0, 8)
  const statusData = ['pending', 'in_production', 'ready', 'dispatched'].map((k) => ({ name: STATUS_LABEL[k], value: orders.filter((o) => o.type === 'sales' && o.status === k).length })).filter((x) => x.value)
  const due = open.slice().sort((a, b) => a.dueDate - b.dueDate).slice(0, 5)
  const greet = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening'

  const kpis = [
    { label: 'Sales this month', num: thisMonth, fmt: money, icon: Wallet, grad: 'from-brand-500 via-indigo-500 to-violet-600', change },
    { label: 'Open orders', num: open.length, sub: `${open.filter((o) => o.dueDate < now + 3 * DAY).length} due in 3 days`, icon: ClipboardList, grad: 'from-fuchsia-500 via-pink-500 to-rose-500', to: '/orders' },
    { label: 'Inventory value', num: stockValue, fmt: money, sub: `${materials.length} materials · ${products.length} products`, icon: Factory, grad: 'from-emerald-500 via-teal-500 to-cyan-500', to: '/inventory' },
    { label: 'Low stock items', num: lowM.length + lowP.length, sub: lowM.length + lowP.length ? 'Needs reordering' : 'All healthy', icon: AlertTriangle, grad: 'from-amber-400 via-orange-500 to-red-500', to: '/inventory' },
  ]

  return (
    <div className="space-y-6">
      <PageHead tone="blue" icon={LayoutDashboard} title={`${greet}, ${state.session.name.split(' ')[0]} 👋`} sub={`Here's what's happening at ${state.settings.companyName} today.`}>
        <Link to="/products" className="btn-ghost"><Hammer className="h-4 w-4" /><span className="sm:hidden">Produce</span><span className="hidden sm:inline">Record production</span></Link>
        <Link to="/orders?new=sales" className="btn-primary"><Plus className="h-4 w-4" />New order</Link>
      </PageHead>

      <div className="stagger grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {kpis.map((k) => {
          const Inner = (
            <>
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/20 blur-xl transition-transform duration-500 group-hover:scale-150" />
              <div className="pointer-events-none absolute -bottom-10 -left-6 h-24 w-24 rounded-full bg-black/10 blur-xl" />
              <div className="relative flex items-start justify-between gap-2">
                <p className="text-xs font-semibold text-white/85 sm:text-sm">{k.label}</p>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/20 ring-1 ring-white/30 backdrop-blur transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 sm:h-10 sm:w-10 sm:rounded-xl"><k.icon className="h-4 w-4 sm:h-5 sm:w-5" /></span>
              </div>
              <p className="relative mt-2 truncate font-display text-lg font-extrabold drop-shadow-sm sm:mt-3 sm:text-3xl"><CountUp value={k.num} format={k.fmt || ((n) => Math.round(n).toLocaleString())} /></p>
              {k.change !== undefined ? (
                <p className="relative mt-1 flex items-center gap-1 text-[11px] font-semibold text-white sm:text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-1.5 py-0.5">{k.change >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}{Math.abs(k.change).toFixed(1)}%</span> <span className="hidden font-normal text-white/80 sm:inline">vs same period last month</span><span className="font-normal text-white/80 sm:hidden">vs last mo.</span>
                </p>
              ) : <p className="relative mt-1 truncate text-[11px] text-white/80 sm:text-xs">{k.sub}</p>}
            </>
          )
          const cls = `group shine relative min-w-0 overflow-hidden rounded-2xl bg-gradient-to-br anim-gradient p-4 text-white shadow-lg lift sm:p-5 ${k.grad}`
          return k.to ? <Link key={k.label} to={k.to} className={cls}>{Inner}</Link> : <div key={k.label} className={cls}>{Inner}</div>
        })}
      </div>

      <div className="stagger grid gap-4 xl:grid-cols-3">
        <div className="card lift p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div><h3 className="font-bold text-ink-900">Sales</h3><p className="text-sm text-slate-500">Last 30 days</p></div>
            <p className="font-display text-xl font-extrabold">{money(series.reduce((s, d) => s + d.sales, 0))}</p>
          </div>
          <div className="mt-4 h-52 sm:h-64">
            <ResponsiveContainer>
              <AreaChart data={series} margin={{ left: -6, right: 8 }}>
                <defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8b5cf6" stopOpacity={0.45} /><stop offset="1" stopColor="#3b6cf6" stopOpacity={0} /></linearGradient><linearGradient id="sl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2550eb" /><stop offset=".5" stopColor="#7c3aed" /><stop offset="1" stopColor="#db2777" /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={4} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => (v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : `${Math.round(v / 1000)}k`)} />
                <Tooltip formatter={(v) => money(v)} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="sales" stroke="url(#sl)" strokeWidth={3} fill="url(#s)" animationDuration={1200} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card lift p-5">
          <h3 className="font-bold text-ink-900">Open orders by status</h3>
          <p className="text-sm text-slate-500">Sales orders not yet delivered</p>
          <div className="relative h-48">
            <ResponsiveContainer>
              <PieChart><Pie data={statusData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3} stroke="none">{statusData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip /></PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center"><div><p className="font-display text-2xl font-extrabold">{statusData.reduce((s, x) => s + x.value, 0)}</p><p className="text-xs text-slate-500">orders</p></div></div>
          </div>
          <div className="space-y-2">{statusData.map((s, i) => <div key={s.name} className="flex items-center gap-2 text-sm"><span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} /><span className="flex-1">{s.name}</span><b>{s.value}</b></div>)}</div>
        </div>
      </div>

      <div className="stagger grid gap-4 xl:grid-cols-3">
        <div className="card lift p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div><h3 className="font-bold text-ink-900">Production output</h3><p className="text-sm text-slate-500">Bags produced, last 30 days · {fmtQty(producedMonth)} bags this month</p></div>
            <Link to="/products" className="text-sm font-semibold text-brand-600">Produce</Link>
          </div>
          <div className="mt-4 h-48 sm:h-56">
            <ResponsiveContainer>
              <BarChart data={production} margin={{ left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#eef4ff' }} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
                <Bar dataKey="qty" name="Bags" radius={[8, 8, 0, 0]} animationDuration={1000}>{production.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card lift p-5">
          <div className="flex items-center justify-between"><h3 className="font-bold text-ink-900">Low stock</h3><Link to="/inventory" className="text-sm font-semibold text-brand-600">Inventory</Link></div>
          <div className="mt-4 space-y-2">
            {!lowM.length && !lowP.length && <p className="py-8 text-center text-sm text-slate-500">All stock levels healthy ✅</p>}
            {[...lowM.map((m) => ({ ...m, kindLabel: 'Material' })), ...lowP.map((p) => ({ ...p, unit: 'bags', kindLabel: 'Product' }))].slice(0, 6).map((i) => (
              <div key={i.id} className="rounded-xl bg-amber-50/60 p-3 ring-1 ring-amber-100">
                <div className="flex items-center justify-between text-sm"><b>{i.name}</b><span className="font-bold text-amber-700">{fmtQty(i.qty)} {i.unit}</span></div>
                <div className="mt-2 h-1.5 rounded-full bg-amber-100"><div className="h-full rounded-full bg-amber-500" style={{ width: `${Math.min(100, (i.qty / i.min) * 100)}%` }} /></div>
                <p className="mt-1 text-xs text-slate-500">{i.kindLabel} · min {fmtQty(i.min)} {i.unit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="stagger grid gap-4 xl:grid-cols-2">
        <div className="card lift p-5">
          <div className="flex items-center justify-between"><h3 className="font-bold text-ink-900">Orders due soon</h3><Link to="/orders" className="flex items-center gap-1 text-sm font-semibold text-brand-600">All orders <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="mt-3 divide-y divide-slate-100">
            {due.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No open orders</p>}
            {due.map((o) => {
              const late = o.dueDate < now
              return (
                <Link to={`/orders?open=${o.id}`} key={o.id} className="flex items-center gap-3 py-3 hover:bg-slate-50">
                  <div className="min-w-0 flex-1"><p className="truncate font-semibold">{o.number} <span className="font-normal text-slate-500">· {customers.find((c) => c.id === o.party)?.name}</span></p><p className={`text-xs ${late ? 'font-semibold text-rose-600' : 'text-slate-500'}`}>{late ? 'Overdue · ' : 'Due '}{fmtDate(o.dueDate)}</p></div>
                  <div className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-3"><span className="text-sm font-semibold">{money(o.total)}</span><StatusBadge status={o.status} /></div>
                </Link>
              )
            })}
          </div>
        </div>
        <div className="card lift p-5">
          <div className="flex items-center justify-between"><h3 className="font-bold text-ink-900">Recent activity</h3><Link to="/history" className="flex items-center gap-1 text-sm font-semibold text-brand-600">Full history <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="mt-3 space-y-1">
            {history.slice(0, 6).map((h) => {
              const [Icon, cls] = KIND_ICON[h.kind] || KIND_ICON.edit
              return (
                <div key={h.id} className="flex items-start gap-3 rounded-xl px-2 py-2">
                  <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${cls}`}><Icon className="h-4 w-4" /></span>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{h.action}{h.item ? ` · ${h.item}` : ''}{h.qty ? <span className={h.qty > 0 ? 'text-emerald-600' : 'text-rose-600'}> ({h.qty > 0 ? '+' : ''}{fmtQty(h.qty)})</span> : null}</p><p className="truncate text-xs text-slate-500">{h.ref} · {h.user} · {timeAgo(h.at)}</p></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
