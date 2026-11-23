import { useState } from 'react'
import { Lock, Mail, ArrowRight, Boxes, ClipboardList, History, Gauge } from 'lucide-react'
import { useStore } from '../lib/store'
import { Logo } from '../components/ui'

export default function Login() {
  const { state, dispatch } = useStore()
  const [email, setEmail] = useState('admin@factora.demo')
  const [password, setPassword] = useState('demo1234')
  const [err, setErr] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const user = state.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
    if (!user || password.length < 4) { setErr('Use one of the demo accounts below (any password of 4+ characters).'); return }
    dispatch({ type: 'LOGIN', user })
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-500/30 blur-[120px]" />
        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-cyan-400/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="relative"><Logo dark /></div>
        <div className="relative max-w-md">
          <h1 className="text-4xl font-extrabold leading-tight">Run your whole factory from one dashboard.</h1>
          <p className="mt-4 text-slate-300">Track raw materials, plan production, manage orders and keep a full audit trail. Real time, from any device.</p>
          <div className="mt-10 grid grid-cols-2 gap-3">
            {[[Gauge, 'Live dashboard'], [Boxes, 'Inventory & BOM'], [ClipboardList, 'Sales & purchase orders'], [History, 'Complete history']].map(([Icon, t]) => (
              <div key={t} className="flex items-center gap-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10"><Icon className="h-5 w-5 text-brand-300" /><span className="text-sm font-semibold">{t}</span></div>
            ))}
          </div>
        </div>
        <p className="relative text-sm text-slate-500">© {new Date().getFullYear()} Factora</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden"><Logo /></div>
          <h2 className="mt-8 text-3xl font-extrabold text-ink-900 lg:mt-0">Welcome back</h2>
          <p className="mt-1 text-slate-500">Sign in to {state.settings.companyName}</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block"><span className="label">Email</span>
              <div className="relative"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className="input pl-9" value={email} onChange={(e) => { setEmail(e.target.value); setErr('') }} /></div>
            </label>
            <label className="block"><span className="label">Password</span>
              <div className="relative"><Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="password" className="input pl-9" value={password} onChange={(e) => { setPassword(e.target.value); setErr('') }} /></div>
            </label>
            {err && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{err}</p>}
            <button className="btn-primary w-full py-3 text-base">Sign in <ArrowRight className="h-4 w-4" /></button>
          </form>
          <div className="mt-8 rounded-2xl bg-slate-100 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Demo accounts: tap to sign in</p>
            <div className="mt-3 space-y-2">
              {state.users.map((u) => (
                <button key={u.id} onClick={() => dispatch({ type: 'LOGIN', user: u })} className="flex w-full items-center gap-3 rounded-xl bg-white p-2.5 text-left ring-1 ring-slate-200 transition hover:ring-brand-400">
                  <span className="grid h-8 w-8 place-items-center rounded-lg text-sm font-bold text-white" style={{ background: u.color }}>{u.name[0]}</span>
                  <span className="flex-1 text-sm"><b className="block text-ink-900">{u.name}</b><span className="text-slate-500">{u.role}</span></span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
