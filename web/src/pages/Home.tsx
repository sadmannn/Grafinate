export default function Home() {
  return (
    <section>
      <div className="gradient-hero rounded-2xl p-10 text-white">
        <h1 className="text-4xl md:text-5xl font-bold">Custom 3D Prints, Done Right</h1>
        <p className="mt-3 max-w-2xl text-white/90">High‑quality prints with optional sanding, painting, and assembly. Browse products or upload your own model.</p>
        <div className="mt-6 flex gap-3">
          <a className="btn-primary" href="/products">Browse Products</a>
          <a className="btn-cta btn-primary" href="/custom-request">Custom Print Request</a>
        </div>
      </div>
    </section>
  )
}


