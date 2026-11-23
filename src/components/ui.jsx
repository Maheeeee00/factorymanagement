import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { STATUS_CLS, STATUS_LABEL } from '../lib/store'

export function Logo({ dark = false, iconOnly = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-glow">
        <svg viewBox="0 0 64 64" className="h-5 w-5"><path d="M10 52V28l12 7v-7l12 7v-7l12 7V12h8v40z" fill="currentColor" /></svg>
      </span>
      {!iconOnly && <span className={`font-display text-xl font-extrabold ${dark ? 'text-white' : 'text-ink-900'}`}>Factora</span>}
    </div>
  )
}

export function StatusBadge({ status }) {
  return <span className={`chip ${STATUS_CLS[status] || 'bg-slate-100 text-slate-600'}`}>{STATUS_LABEL[status] || status}</span>
}

export function StockBadge({ qty, min }) {
  if (qty <= 0) return <span className="chip bg-rose-100 text-rose-700">Out of stock</span>
  if (qty < min) return <span className="chip bg-amber-100 text-amber-700">Low stock</span>
  return <span className="chip bg-emerald-100 text-emerald-700">In stock</span>
}

export function Modal({ open, onClose, title, children, wide = false }) {
  useEffect(() => {
    if (!open) return
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative max-h-[92vh] w-full overflow-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl ${wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'}`}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur">
          <h3 className="text-lg font-bold text-ink-900">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export function Toggle({ on, onChange }) {
  return (
    <button type="button" onClick={() => onChange(!on)} className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? 'bg-brand-600' : 'bg-slate-300'}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  )
}

export function Empty({ icon: Icon, title, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400"><Icon className="h-7 w-7" /></div>
      <p className="mt-4 font-semibold text-slate-700">{title}</p>
      {text && <p className="mt-1 text-sm text-slate-500">{text}</p>}
    </div>
  )
}

export function PageHead({ title, sub, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">{title}</h1>{sub && <p className="mt-1 text-slate-500">{sub}</p>}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="inline-flex rounded-xl bg-white p-1 ring-1 ring-slate-200">
      {tabs.map(([k, l, count]) => (
        <button key={k} onClick={() => onChange(k)} className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-semibold transition ${value === k ? 'bg-ink-900 text-white' : 'text-slate-600 hover:text-ink-900'}`}>
          {l}{count !== undefined && <span className={`rounded-md px-1.5 text-xs ${value === k ? 'bg-white/20' : 'bg-slate-100'}`}>{count}</span>}
        </button>
      ))}
    </div>
  )
}

export function Field({ label, children, className = '' }) {
  return <label className={`block ${className}`}><span className="label">{label}</span>{children}</label>
}

// Two-step delete button (no browser popups).
export function ConfirmButton({ onConfirm, className = '', armedLabel = 'Confirm?', children, title }) {
  const [armed, setArmed] = useState(false)
  useEffect(() => { if (!armed) return; const t = setTimeout(() => setArmed(false), 3000); return () => clearTimeout(t) }, [armed])
  return (
    <button type="button" title={title} onClick={() => (armed ? (setArmed(false), onConfirm()) : setArmed(true))} className={armed ? 'rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-bold text-white' : className}>
      {armed ? armedLabel : children}
    </button>
  )
}

let toastFn = null
export function toast(msg) { toastFn?.(msg) }
export function Toaster() {
  const [items, setItems] = useState([])
  useEffect(() => {
    toastFn = (msg) => { const id = Math.random(); setItems((x) => [...x, { id, msg }]); setTimeout(() => setItems((x) => x.filter((i) => i.id !== id)), 2600) }
    return () => { toastFn = null }
  }, [])
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] space-y-2">
      {items.map((t) => <div key={t.id} className="animate-slideIn rounded-xl bg-ink-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl">✓ {t.msg}</div>)}
    </div>
  )
}
