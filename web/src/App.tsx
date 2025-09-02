import { Link, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-dvh bg-white text-[color:var(--color-text)]">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">Grafinate</Link>
          <nav className="flex gap-4 text-sm">
            <Link to="/products" className="hover:underline">Products</Link>
            <Link to="/custom-request" className="hover:underline">Custom Request</Link>
            <Link to="/checkout" className="hover:underline">Checkout</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="mt-20 border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-500">
          © {new Date().getFullYear()} Grafinate
        </div>
      </footer>
    </div>
  )
}
