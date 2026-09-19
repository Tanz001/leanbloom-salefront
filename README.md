# LeanBloom Health — Multi-Tenant White-Label Patient Storefront

A modern, clinical-wellness, interactive patient-facing storefront template used by LeanBloom Health affiliates. Each affiliate operates on their own custom domain or subdomain with customized branding, retail pricing, contact details, and catalog, while routing medical evaluations and prescription fulfillment seamlessly into the **LeanBloom & MyDose clinical telehealth network**.

---

## 1. Multi-Tenant Architecture & Domain Resolution

The storefront is a **single shared codebase** serving multiple affiliate clinics. In production, the active tenant is resolved automatically based on the incoming web request:

```
                  ┌─────────────────────────────────┐
                  │ Patient Visits:                 │
                  │ - care.apexmetabolic.com        │
                  │ - shop.verdantvitality.health   │
                  │ - rx.auralifemedical.com        │
                  └────────────────┬────────────────┘
                                   │
                                   ▼
                   [Hostname Tenant Resolver]
                (src/data/affiliates.ts: resolveAffiliateByHostname)
                                   │
                 Matches customDomain or subdomain
                                   │
                                   ▼
                 [TenantContext & Dynamic Theme Engine]
     Injects CSS Variables: --brand-primary, --brand-secondary
                 Updates Document Title & Brand Assets
                                   │
                                   ▼
┌──────────────────────────────────┴──────────────────────────────────┐
│                   Patient Storefront Experience                    │
│  - Affiliate Logo & Business Name                                   │
│  - Affiliate Retail Pricing & Markups                               │
│  - Affiliate Support Hotline & Direct Email                         │
│  - "Powered by LeanBloom" (respects hidePoweredBy setting)          │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                  Patient Completes Checkout Intake
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│          LeanBloom / MyDose Medical Handoff Screen                  │
│  - Order Reserved at Accredited 503A Pharmacy                       │
│  - Asynchronous Intake with State-Licensed Physician                │
│  - Sterile Compounding & Cold-Chain Delivery                        │
└─────────────────────────────────────────────────────────────────────┘
```

### Production Domain Resolution Transition
Currently, the app includes a top **Demo Tenant Switcher** (`DemoTenantSwitcher.tsx`) for review in AI Studio.

To activate 100% automatic domain lookup in production:
1. In `src/context/TenantContext.tsx`, `resolveAffiliateByHostname(window.location.hostname)` is already implemented.
2. Ensure wildcard or custom domain routing points to the app deployment (e.g. Cloud Run, Vercel, or AWS CloudFront).
3. Connect your central Admin API endpoint (or Firestore database) to fetch the affiliate record matching `hostname`:
   ```ts
   // Example API replacement:
   const res = await fetch(`/api/affiliates/resolve?domain=${window.location.hostname}`);
   const affiliateConfig = await res.json();
   ```
4. Remove `<DemoTenantSwitcher />` from `src/App.tsx`.

---

## 2. Admin-Provided Branding Fields & UI Mapping

When an administrator configures an affiliate in the LeanBloom Admin system, the fields map directly into the patient storefront as follows:

| Field | Type | Description | UI Location & Effect |
| :--- | :--- | :--- | :--- |
| `businessName` | string | Legal clinic or practice name | Header title, Hero badge, Order summaries, Footer copyright |
| `primaryColor` | hex | Primary brand color | Sets `--brand-primary`. Used in primary buttons, hero banners, headers |
| `secondaryColor` | hex | Accent / secondary color | Sets `--brand-secondary`. Used in cart badges, step icons, status pills |
| `primaryColorSoft` | rgba | Soft background tint | Used in subtle card highlights and active backgrounds |
| `tagline` | string | Practice mission/tagline | Displayed beneath header logo and in footer |
| `welcomeMessage`| string | Hero introductory text | Featured in the first viewport hero section |
| `supportPhone` | string | Clinic phone number | Header phone chip, footer, and checkout reassurance |
| `supportEmail` | string | Dedicated patient email | Footer, Support ticket view, and confirmation receipts |
| `clinicAddress` | string | Physical clinic address | Displayed in footer and support information |
| `businessHours` | string | Hours of availability | Displayed on support page and footer |
| `hidePoweredBy` | boolean | White-label flag | If `true`, removes the "Powered by LeanBloom" footer badge |
| `customDomain` | string | CNAME / vanity domain | Used by `resolveAffiliateByHostname()` |
| `subdomain` | string | LeanBloom subdomain | Used as fallback identifier (e.g. `abc.leanbloom.health`) |
| `affiliatePricing` | object | Custom retail price per product | Overrides base price on catalog, product detail, cart, & checkout |

---

## 3. The LeanBloom / MyDose Medical Fulfillment Flow

A central architectural requirement is that **the affiliate storefront does not replace clinical governance**:

1. **Browsing & Program Selection**: The patient browses physician-formulated protocols (e.g. Semaglutide + B12, Tirzepatide, NAD+, Oral Troches).
2. **Checkout Intake**: The patient provides demographic information, state of residence (for doctor licensure verification), shipping address, and accepts informed telehealth consent.
3. **Medical Handoff (The Critical Screen)**:
   - Immediately upon submitting payment allocation, the patient lands on the **Medical Handoff & Clinical Intake Screen**.
   - Clear disclosures explain that a board-certified physician licensed in the patient's state evaluates medical eligibility asynchronously.
   - The primary call-to-action directs patients to the **LeanBloom / MyDose Clinical Portal** to complete the comprehensive medical intake (height, weight, medical history, contraindications like MTC/MEN2, medications).
   - If the reviewing physician determines that a protocol is not medically appropriate, a **100% refund** is automatically issued.

---

## 4. State Management & Cart Isolation

- `TenantContext`: Manages active affiliate, CSS variable injection, dynamic document title, and simulated domain testing.
- `CartContext`: Manages patient cart items, persisted in `localStorage` under `leanbloom_cart_${tenant.id}` so affiliate cart states remain clean and isolated.
- `CheckoutContext`: Manages patient intake drafts and stores completed orders under `leanbloom_patient_orders_history` for lookup on the Order Status tracking page.

---

## 5. Accessibility & Design System

- **Typography**: Paired display typography (`Outfit` / `Plus Jakarta Sans`) with standard mathematical scales.
- **Micro-Interactions**: Tasteful transitions and accordion animations via `motion/react`.
- **Responsive**: Mobile-first architecture with mobile hamburger drawer, sticky mobile purchase bar on product detail, and clean desktop 2-column checkout.
- **Trust Indicators**: Verified compounding standards (503A/503B), temperature-monitored cold chain packaging badges, and HIPAA encryption seals.
