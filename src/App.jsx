import { Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './lib/store'
import Login from './pages/Login'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
import Products from './pages/Products'
import Orders from './pages/Orders'
import History from './pages/History'
import Settings from './pages/Settings'
import { Toaster } from './components/ui'

export default function App() {
  const { state } = useStore()
  if (!state.session) return <><Login /><Toaster /></>
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}
