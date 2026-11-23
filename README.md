# Factora — Factory Management System

A clean, modern factory management app with a **dashboard, inventory, products (bill of materials and production), sales and purchase orders, full history, and settings**.

Built with **React 18 + Vite + Tailwind CSS + Recharts**. Demo data is stored in the browser (localStorage), so it deploys to Vercel for free with no backend.

---

## ✨ Features

| Page | What it does |
|---|---|
| **Login** | Demo accounts for Admin, Store Manager, Production Supervisor and Sales (tap to sign in) |
| **Dashboard** | Sales this month, open orders, inventory value, low-stock count, 30-day sales chart, open orders by status, production output, low-stock list, orders due soon, recent activity |
| **Inventory** | Raw materials and finished goods, stock level bars, low-stock filter, **stock in/out with reasons**, add/edit/delete materials, CSV export |
| **Products** | Product catalogue with **bill of materials (BOM)**, unit cost and margin, "can make N more", **Produce** (deducts materials, adds finished stock) |
| **Orders** | **Sales orders** (Pending → In production → Ready → Dispatched → Delivered) and **purchase orders** (Draft → Ordered → Received). Dispatch deducts stock; receiving adds stock; blocks dispatch if stock is short |
| **History** | Complete audit trail: stock in/out, production, orders and edits, filtered by type, date range and user, with search and CSV export |
| **Settings** | Company profile, currency, tax, order prefixes, low-stock alerts, customers and suppliers, users and roles, **backup/restore (JSON)**, reset demo |

The demo factory ("Crescent Plastics Ltd.") and all its data are fictional.

---

## 🚀 Run locally

```bash
npm install
npm run dev
```
Then open http://localhost:5173

## 📦 Push to GitHub

```bash
git init
git add .
git commit -m "Factora factory management"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/factora.git
git push -u origin main
```
(First create an empty repo at https://github.com/new.)

## ▲ Deploy on Vercel (preview)

1. Go to https://vercel.com/new and sign in with GitHub.
2. Import the `factora` repository.
3. Vercel detects **Vite** automatically (Build: `npm run build`, Output: `dist`). Click **Deploy**.
4. You get a live preview URL such as `https://factora.vercel.app`.

Every `git push` redeploys automatically, and every branch or pull request gets its own preview link.

> Vercel's free Hobby plan is for personal, non-commercial use. That's fine for previews and demos. For a paid client project, use Vercel Pro or host on your Hostinger KVM (Coolify).

---

## 🗂 Project structure

```
src/
  lib/
    data.js      demo seed data (materials, products + BOM, customers, suppliers, users, order history)
    store.jsx    global state, localStorage, all actions (stock, production, orders, settings) and history logging
  components/
    ui.jsx       Logo, badges, modal, tabs, toggle, confirm button, toasts
  pages/
    Login.jsx  Layout.jsx  Dashboard.jsx  Inventory.jsx  Products.jsx  Orders.jsx  History.jsx  Settings.jsx
```

## 🎨 Customise

- **Name and logo:** `src/components/ui.jsx` (`Logo`) and `index.html`
- **Brand colours:** `tailwind.config.js` → `colors.brand`
- **Demo data:** `src/lib/data.js`. After editing, use **Settings → Data & backup → Reset demo data**.

## 🔌 Going live with real data (PocketBase)

The demo keeps data in each browser. For real multi-user use:

1. Create a PocketBase instance (e.g. PocketBase Cloud) with collections matching `data.js`: `materials`, `products`, `customers`, `suppliers`, `orders`, `history`, plus a `users` auth collection.
2. `npm install pocketbase`, then add `VITE_PB_URL=https://your-instance.pocketbasecloud.com` to `.env` (and to Vercel → Settings → Environment Variables).
3. Replace each action in `src/lib/store.jsx` (`ADJUST`, `PRODUCE`, `CREATE_ORDER`, `ORDER_STATUS`, …) with the matching PocketBase call, and use `pb.collection(...).subscribe('*')` for live updates.

Each action is self-contained, so you can convert one page at a time.
