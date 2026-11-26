import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Download, History as HistoryIcon } from 'lucide-react'
import { useStore, fmtQty, toCSV, download } from '../lib/store'
import { PageHead, Empty } from '../components/ui'
import { KIND_ICON } from './Dashboard'

const KINDS = [['all', 'All activity'], ['stock_in', 'Stock in'], ['stock_out', 'Stock out'], ['production', 'Production'], ['order', 'Orders'], ['edit', 'Changes']]
const RANGES = [['7', 'Last 7 days'], ['30', 'Last 30 days'], ['all', 'All time']]
const DAY = 86400000

export default function History() {
  const { state } = useStore()
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const [kind, setKind] = useState('all')
  const [range, setRange] = useState('30')
  const [user, setUser] = useState('all')
  const [limit, setLimit] = useState(40)

  const users = [...new Set(state.history.map((h) => h.user))]
  const list = useMemo(() => state.history.filter((h) =>
    (kind === 'all' || h.kind === kind) &&
    (range === 'all' || h.at >= Date.now() - +range * DAY) &&
    (user === 'all' || h.user === user) &&
    `${h.action} ${h.ref || ''} ${h.item || ''} ${h.detail || ''} ${h.user}`.toLowerCase().includes(q.toLowerCase())), [state.history, kind, range, user, q])

  const stats = {
    in: list.filter((h) => h.kind === 'stock_in').length,
    out: list.filter((h) => h.kind === 'stock_out').length,
    prod: list.filter((h) => h.kind === 'production').reduce((s, h) => s + (h.qty || 0), 0),
  }

  const groups = []
  list.slice(0, limit).forEach((h) => {
    const d = new Date(h.at).toDateString()
    const g = groups[groups.length - 1]
    if (g && g.d === d) g.items.push(h)
    else groups.push({ d, items: [h] })
  })
  const dayLabel = (d) => {
    const t = new Date(d).getTime(), today = new Date().setHours(0, 0, 0, 0)
    if (t === today) return 'Today'
    if (t === today - DAY) return 'Yesterday'
    return new Date(d).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  }

  const exportCsv = () => download('history.csv', toCSV([['Date', 'Type', 'Action', 'Reference', 'Item', 'Qty', 'Details', 'User'], ...list.map((h) => [new Date(h.at).toLocaleString(), h.kind, h.action, h.ref || '', h.item || '', h.qty ?? '', h.detail || '', h.user])]))

  return (
    <div>
      <PageHead tone="sky" icon={HistoryIcon} title="History" sub="Complete audit trail of stock movements, production, orders and changes" stats={[['Entries', list.length], ['Stock in / out', `${stats.in} / ${stats.out}`], ['Bags produced', fmtQty(stats.prod)]]}>
        <button onClick={exportCsv} className="btn-ghost"><Download className="h-4 w-4" />Export CSV</button>
      </PageHead>

      <div className="card">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4">
          <div className="relative w-full sm:w-auto sm:min-w-[220px] sm:flex-1">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => { setQ(e.target.value); setLimit(40) }} className="input ps-9" placeholder="Search order no., SKU, item, user…" />
          </div>
          <select value={range} onChange={(e) => setRange(e.target.value)} className="input flex-1 sm:w-auto sm:flex-none">{RANGES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
          <select value={user} onChange={(e) => setUser(e.target.value)} className="input flex-1 sm:w-auto sm:flex-none"><option value="all">All users</option>{users.map((u) => <option key={u}>{u}</option>)}</select>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-slate-100 px-4 py-3">
          {KINDS.map(([k, l]) => <button key={k} onClick={() => { setKind(k); setLimit(40) }} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${kind === k ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{l}</button>)}
        </div>

        <div className="p-4 sm:p-6">
          {groups.length === 0 && <Empty icon={HistoryIcon} title="No activity found" text="Try a wider date range or a different filter" />}
          {groups.map((g) => (
            <div key={g.d} className="mb-6 last:mb-0">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">{dayLabel(g.d)}</p>
              <div className="stagger relative space-y-1 border-s-2 border-indigo-100 ps-5 sm:ps-6">
                {g.items.map((h) => {
                  const [Icon, cls] = KIND_ICON[h.kind] || KIND_ICON.edit
                  return (
                    <div key={h.id} className="relative flex flex-col gap-1 rounded-xl px-2 py-2.5 hover:bg-slate-50 sm:flex-row sm:items-start sm:gap-3 sm:px-3">
                      <span className={`absolute -start-[37px] top-2.5 grid h-8 w-8 place-items-center rounded-lg ring-4 ring-white sm:-start-[42px] ${cls}`}><Icon className="h-4 w-4" /></span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-ink-900">
                          {h.action}{h.item ? <span className="font-normal text-slate-600"> · {h.item}</span> : null}
                          {h.qty ? <span className={`ml-2 chip ${h.qty > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{h.qty > 0 ? '+' : ''}{fmtQty(h.qty)}</span> : null}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">{h.detail}</p>
                      </div>
                      <div className="flex flex-wrap gap-x-2 text-xs text-slate-500 sm:block sm:text-right">
                        <p className="font-mono font-semibold text-slate-700">{h.ref}</p>
                        <p>{h.user} · {new Date(h.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          {list.length > limit && <div className="text-center"><button onClick={() => setLimit(limit + 40)} className="btn-ghost">Load more ({list.length - limit} remaining)</button></div>}
        </div>
      </div>
    </div>
  )
}
