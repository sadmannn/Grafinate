# Grafinate – Build Roadmap & Workflow

> Living document. Check items off as you complete them. Use this as the single source of truth for scope, security, and launch readiness.
>
> Free‑tier‑first policy: prefer free services/features across the stack (Cloudflare Pages, Supabase Free, GitHub Actions, Sentry Free, Cloudflare WAF Free). The only paid item is the custom domain. If a paid capability becomes necessary, open an "Exit Free Tier" issue with options and costs before approval.

---

## At‑a‑glance Status
- [x] Create roadmap file
- [ ] Initialize repo, CI/CD, environments
- [ ] Schema + RLS in Supabase
- [ ] React + Tailwind app scaffolded on Cloudflare Pages
- [ ] Catalog + Product Details
- [ ] Custom Print Request (STL upload)
- [ ] Checkout via Messenger/WhatsApp
- [ ] Admin Panel (secure, role‑based)
- [ ] QA, performance, accessibility
- [ ] Launch (prod)

---

## Phase 0 — Project Setup & Governance
- [x] Create Git repository and branching model (`main`, `dev`, release branches)
- [ ] Add issue templates, PR template, and CODEOWNERS
- [ ] Node 20 LTS + pnpm; configure `.nvmrc` and `.npmrc`
- [ ] Tooling: TypeScript, ESLint, Prettier, Commitlint, Husky pre‑commit hooks
- [ ] Create Cloudflare Pages project (staging + production), connect repo
- [ ] Create Supabase project (staging + production)
- [ ] Configure env management and secrets (Cloudflare + local `.env`), document keys/rotation
- [ ] Set up CI: build, lint, type‑check, unit tests, preview deployments per PR
- [ ] DNS + custom domain + Cloudflare SSL/TLS (Full Strict)
- [ ] Observability: Sentry (frontend, Free), Supabase logs, Cloudflare Analytics (Free)

Deliverables:
- Versioned repo with CI green on main
- Environments documented in `docs/environments.md`

---

## Phase 1 — Data & Auth (Supabase)
- [ ] Implement tables from `Overview.md` plus the following helpful extras:
  - [ ] `inventory` (product_id, sku, stock, low_stock_threshold)
  - [ ] `reviews` (product_id, user_id, rating, comment, created_at)
  - [ ] `wishlists` (user_id, product_id)
  - [ ] `audit_logs` (actor_id, action, table, row_id, diff, created_at)
  - [ ] `notifications` (user_id, channel, payload, status)
- [ ] Enable Row‑Level Security (RLS) on all tables
- [ ] Write policies for read/write by role (user/admin) and ownership
- [ ] Create Storage buckets: `product-images/`, `uploads/`
- [ ] Add Storage validation: file size caps, mime allow‑list (`.stl`, `.obj`, images)
- [ ] DB functions: compute order total, message templating for checkout
- [ ] Seed data scripts for categories, subcategories, add‑ons

Deliverables:
- Migration scripts checked in and reproducible
- RLS policies reviewed and tested

---

## Phase 2 — Frontend Foundation (React + Tailwind)
- [ ] Scaffold app (Vite + React + TS) and TailwindCSS
- [ ] Project conventions: module aliases, absolute imports, UI kit folder, hooks
- [ ] Routing (React Router): `/`, `/products`, `/products/:id`, `/custom-request`, `/checkout`, `/login`, `/signup`, `/profile`, `/admin`
- [ ] Layout: header, nav, footer, container, toasts, modals
- [ ] State: minimal global store (Zustand or Context) for cart/order draft
- [ ] Supabase client setup with typed APIs

Deliverables:
- Running app with base pages and navigation

---

## Phase 3 — Catalog & Discovery
- [ ] Category/Subcategory data models wired
- [ ] Product grid with responsive cards and skeleton loaders
- [ ] Filters: category, subcategory, price range; search with debounce
- [ ] SEO basics: unique titles, meta, OpenGraph, JSON‑LD for products
- [ ] Image optimization (Cloudflare Images or responsive `srcset`)

Deliverables:
- `/products` usable on mobile and desktop

---

## Phase 4 — Product Details & Add‑ons
- [ ] Product page with image gallery, description, base price
- [ ] Add‑ons selector with custom prices and quantity handling
- [ ] Price breakdown and live total calculation
- [ ] Optional: 3D preview viewer for models (`<model-viewer>` or three.js)

Deliverables:
- `/products/:id` with add‑ons and accurate totals

---

## Phase 5 — Custom Print Request (Uploads)
- [ ] Form: upload STL/OBJ OR describe request; choose add‑ons
- [ ] Client‑side validation (file type, size, required fields)
- [ ] Upload to Supabase Storage with signed URLs
- [ ] Server rules to prevent executable uploads and enforce size caps
- [ ] Create `pending` order in DB upon submit

Deliverables:
- `/custom-request` creates a valid pending order with attached file(s)

---

## Phase 6 — Checkout via Messenger/WhatsApp (Stage 1)
- [ ] Order summary page with items, add‑ons, totals
- [ ] User selects Messenger or WhatsApp
- [ ] Generate pre‑filled message (product names, add‑ons, totals, user info)
- [ ] Open chat app via deep link; persist `chat_channel` and `chat_message`
- [ ] Update order status workflow: `pending → awaiting_payment → paid → completed`

Deliverables:
- `/checkout` reliably opens chosen chat with a correct pre‑filled message

---

## Phase 7 — Auth, Profile & Orders
- [ ] Supabase Auth flows for login/signup/password reset
- [ ] Profile page: view orders, statuses, re‑order
- [ ] Guarded routes and protected API calls

Deliverables:
- `/profile` with user‑specific data via RLS

---

## Phase 8 — Admin Panel (Secure)
- [ ] RBAC: admin‑only access with route guards
- [ ] Two‑factor authentication for admin accounts
- [ ] CRUD: Products (with images), Categories, Subcategories
- [ ] CRUD: Add‑ons + assign to products with custom prices
- [ ] Orders table: search, filter by status, update status, view chat links
- [ ] Inventory management (optional for Stage 1)
- [ ] Audit log viewer

Deliverables:
- `/admin` is production‑secure and fully functional

---

## Phase 9 — Quality, Performance, Accessibility
- [ ] Unit tests (Vitest) for core logic; UI tests (React Testing Library)
- [ ] E2E tests (Playwright) for critical flows
- [ ] Lighthouse: target 90+ Performance/Accessibility/Best Practices/SEO
- [ ] Accessibility checks (axe), keyboard nav, focus states, color contrast
- [ ] Error boundaries and retry strategies for API calls

Deliverables:
- CI includes tests and quality gates

---

## Phase 10 — Deployment, Launch & Ops
- [ ] Staging approvals → Production deploy
- [ ] Backups: daily DB backups; tested restore runbook
- [ ] Monitoring dashboards and alerts (Sentry, Cloudflare, Supabase)
- [ ] Legal pages: Privacy, Terms, Refund/Returns, Cookie Policy
- [ ] Sitemap/robots.txt; analytics set up

Deliverables:
- Public launch with rollback plan

---

## Phase 11 — Future (Stage 2 Payments & Enhancements)
- [ ] bKash Payment Gateway (official PGW), server verification, webhook to mark `paid`
- [ ] Rate limiting and anti‑abuse for payment initiation
- [ ] Saved addresses, shipping integrations, invoices (PDF), email receipts
- [ ] PWA install prompt, offline product browsing
- [ ] Multi‑language (i18n) and currency formatting
- [ ] Advanced search (algolia/meilisearch) and recommendations

---

## Security & Compliance Checklist (Missing in Overview, now added)
- [ ] HTTP security headers: HSTS, CSP (script‑src 'self' plus allowed CDNs), X‑Frame‑Options, X‑Content‑Type‑Options, Referrer‑Policy
- [ ] Cloudflare WAF, DDoS protection, bot management
- [ ] Secrets management with rotation policy; never commit secrets
- [ ] Row‑Level Security on all tables; least‑privilege service roles
- [ ] File upload security: size caps, mime allow‑list, content sniffing; optional antivirus scan
- [ ] Rate limiting for auth, uploads, and order creation
- [ ] Audit logging for admin actions and data changes
- [ ] Data retention policy; user data export/delete (GDPR‑friendly)
- [ ] Cookie banner and consent (if analytics/ads used)
- [ ] Regular dependency & vulnerability scans (Dependabot/GitHub Security)

---

## Standout Features (Value Add)
- [ ] 3D model viewer on product pages (GLB/GLTF/OBJ), with orbit/zoom
- [ ] AI print‑time and cost estimator from STL volume (future)
- [ ] Customer gallery and reviews with photos
- [ ] Shareable quote links for custom requests
- [ ] Real‑time order progress tracker (prep → printing → finishing → ready)
- [ ] Marketing: email capture, product waitlists, promo codes (future)

---

## Visual Design & Theme
Primary background is white, with lavender/purple accents and vivid reddish‑pink gradients.

Palette (initial):
- Background: `#FFFFFF`
- Text (primary): `#0B0B0F`
- Lavender: `#C4B5FD`
- Purple (primary accent): `#7C3AED`
- Magenta/Pink (accent): `#FF2D55`
- Hot Pink: `#FF4D8D`
- Black: `#000000`

Suggested CSS tokens:
```css
:root {
  --bg: #ffffff;
  --text: #0b0b0f;
  --lavender: #c4b5fd;
  --purple: #7c3aed;
  --pink: #ff2d55;
  --hot-pink: #ff4d8d;
  --gradient-hot-pink: linear-gradient(135deg, #ff1745 0%, #ff2d55 40%, #ff4d8d 100%);
  --gradient-purple-pink: linear-gradient(135deg, #6d28d9 0%, #a21caf 50%, #ff4d8d 100%);
}
```

Usage guidelines:
- White surfaces dominate; purple for primary CTAs, pink gradients for highlights/hero
- Respect WCAG contrast ratios; prefer dark text on white backgrounds
- Keep gradients subtle for readability; use solid colors for body text areas

Note: We can refine exact shades to match your reference image when provided.

---

## Definition of Done (per phase)
- Feature complete, tests passing in CI
- No critical Sentry errors in staging for 48 hours
- Accessibility: keyboard nav + screen reader checks pass
- Performance: LCP < 2.5s on 4G, CLS < 0.1, TTI < 3.5s

---

## Operating Checklist (post‑launch)
- [ ] Weekly dependency updates and vulnerability triage
- [ ] Monthly backup restore drill
- [ ] SLA for order response times; monitor inboxes and chat channels
- [ ] Review audit logs for admin actions

---

## Changelog
- 2025‑09‑01: Initial roadmap created


