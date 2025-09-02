# 3D Printing Business Website – Overview Plan

## 🌐 Tech Stack (Free‑Tier‑First)
- **Frontend**: React + TailwindCSS (hosted on **Cloudflare Pages** with custom domain)
- **Backend / Database**: Supabase (PostgreSQL + Auth + Storage + API)
- **Storage**: Supabase Storage (product images, STL uploads)
- **Authentication**: Supabase Auth (secure login system)
- **Admin Panel**: React-based, role-protected dashboard
- **Payments**:
  - **Stage 1 (Now)**: Checkout via Messenger/WhatsApp with pre-filled message
  - **Stage 2 (Future Upgrade)**: bKash Payment Gateway integration (merchant account, fees apply)

---

## 🏗️ Website Structure

### 1. Home (`/`)
- Hero section with 3D printer visuals
- Clear CTAs: *Custom Print Request* | *Browse Products*
- Highlights: Featured products, customer benefits

### 2. Products (`/products`)
- Organized by **Categories & Sub-Categories** (e.g., Gadgets → Phone Stands, Keychains → Custom Figures)
- Smooth, simple, responsive product grid
- Filters/search for easy navigation

### 3. Product Details (`/products/:id`)
- Product images + description
- Base price + selectable **Add-ons** (e.g., sanding, painting, assembly)
- "Request Order" button → leads to checkout flow

### 4. Custom Print Request (`/custom-request`)
- Upload STL file or describe request
- Add-ons selection
- Submit order → generates pending order entry in DB

### 5. Checkout (`/checkout`)
- Order summary (products + add-ons + total price estimate)
- **Messenger/WhatsApp Checkout**:
  - User chooses Messenger or WhatsApp
  - App opens with pre-filled message (product, add-ons, total, username)
- **Future Upgrade**: bKash automated payment integration

### 6. User Auth & Profile (`/login`, `/signup`, `/profile`)
- Login/register (via Supabase Auth)
- Profile page with:
  - Past orders
  - Order status (Pending, Paid, Completed)

### 7. Admin Panel (`/admin`)
- **Maximum Security**:
  - Role-based access (admin only)
  - Two-factor authentication (via Supabase / external service)
  - HTTPS enforced
- Features:
  - Manage Products: CRUD operations with image uploads
  - Manage Categories & Subcategories
  - Manage Add-ons: Global list with prices
  - Assign add-ons to specific products with custom prices
  - Manage Orders: View, update status (pending, paid, shipped)

---

## 🗄️ Database Schema (Supabase)

**Products**
```
id | name | description | base_price | category_id | subcategory_id | image_urls
```

**Categories**
```
id | name
```

**Subcategories**
```
id | name | category_id
```

**Addons**
```
id | name | description | base_price
```

**Product_Addons (join table)**
```
id | product_id | addon_id | custom_price
```

**Users** (handled by Supabase Auth)
```
id | email | name | role (user/admin)
```

**Orders**
```
id | user_id | product_ids (array) | addon_ids (per product) | total_price_estimate | status | chat_channel | chat_message | timestamp
```

**Uploads** (via Supabase Storage)
```
id | user_id | order_id | file_url
```

---

## 🔄 Workflow

Free approach policy: Build and operate entirely on free tiers whenever possible. The only planned paid item is the custom domain. If any feature requires paid usage, document alternatives and defer until explicitly approved.

### 1. Product Browsing
- User browses categories/subcategories → picks product → selects add-ons.

### 2. Checkout via Messenger/WhatsApp
- Order saved in DB as `pending`.
- User redirected to chosen chat app with **pre-filled order message**.
- You confirm details and share bKash info manually.

### 3. Payment Processing (Stage 1)
- User pays via bKash manually.
- Admin marks order as `paid`.

### 4. Payment Processing (Stage 2, Future)
- Integrate official bKash PGW API.
- Auto-update order status to `paid` after successful transaction.

---

## 📌 Summary
- Clean, modern, mobile-friendly React + Tailwind frontend.
- Organized products with categories and add-ons system.
- Supabase handles DB, auth, and file storage.
- Secure admin panel for product, category, and order management.
- Checkout via Messenger/WhatsApp now → future upgrade with automated bKash payments.

