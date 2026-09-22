# BCI Ventures Private Limited — Website

Premium AI-education website for BCI Ventures, built as a two-part project:

- **`/frontend`** — React + Vite + TypeScript + Tailwind CSS public website and admin panel
- **`/backend`** — Node.js + Express + TypeScript + MongoDB API (scaffolded, see status below)

## Quick start (frontend only — works immediately, no backend needed)

```bash
cd frontend
npm install
npm run dev
```

Open the printed local URL. The site is **fully functional out of the box**: registration, contact/enquiry forms, and certificate verification all work using a local mock data layer (browser localStorage), so you can click through the entire experience — including the admin panel — with zero setup.

Try the certificate verification page with ID `BCI-DEMO-0001` to see a sample verified result.

Visit `/admin/login` (any email/password works in demo mode) to see the admin dashboard, registrations, and enquiries — populated from whatever you submit on the public Register/Contact pages.

## Connecting the real backend

1. Set up MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas)).
2. In `/backend`, copy `.env.example` to `.env` and fill in `MONGO_URI` and `JWT_SECRET`.
3. `cd backend && npm install && npm run dev`
4. In `/frontend/src/services/api.ts`, set `USE_MOCK = false` and set `VITE_API_BASE_URL` in a `.env` file (copy `.env.example`).
5. Restart the frontend dev server.

The frontend's API call signatures already match the backend's real endpoints, so this is a one-line swap, not a rewrite.

## What's complete

- Full public website: Home, About, Courses (Demo/Beginner/Advanced with your exact posters' modules & pricing), individual course detail pages, Certification, Certificate Verify, Contact, Register, 404
- Real BCI logo integrated (navbar, footer, admin sidebar, hero, favicon), theme colors matched to the logo's navy/gold, company name updated to "Billionaire Concept Ingenuity"
- First-visit splash/intro animation of the logo (shows once per browser session, then stays away)
- Working forms (registration, enquiry) and certificate verification, backed by a mock data layer that mirrors the real API contract
- **Full admin panel:**
  - **Courses** — add, edit, delete, change price/duration, add/remove modules, publish/unpublish
  - **Students** — view all students, search by name/email, filter by course, view full registration detail, change status
  - **Enquiries** — pipeline: New → Contacted → Interested → Converted → Closed
  - **Registrations** — view all, change status (Pending/Confirmed/Cancelled)
  - **Certificates** — generate (auto-numbered), download, revoke; verifiable on the public Certificate Verify page
- Complete backend scaffold: Express app, all models (User, Course, Student, Enquiry, Registration, Certificate), all controllers, all routes, JWT auth + admin middleware, validation middleware, and stub services for email/WhatsApp/certificate generation

## What's NOT yet done (remaining work)

- **No live database wired up** — backend code is written but untested against a real MongoDB instance; you'll need to create the first admin user manually (e.g. via a seed script or MongoDB shell) since there's no signup flow by design
- **Certificate downloads are HTML, not true PDF** — the download button generates a styled HTML certificate file; swap in a PDF library (e.g. pdf-lib) for a real PDF export
- **Email & WhatsApp services are stubs** — they log to console instead of actually sending; need real provider credentials (SMTP/SendGrid for email, WhatsApp Business Cloud API or Twilio for WhatsApp)
- **Admin login is still mock** — accepts any credentials; needs to call the real `/api/auth/login` once a backend + admin user exist
- **Deployment** — nothing is deployed; you'll need to deploy frontend to Vercel and backend to Render/Railway and point them at each other via environment variables
- **Testing** — no automated tests
- **Student login/dashboard** — placeholder UI only, not connected to real accounts or content (recorded classes, assignments, etc. per your future roadmap)

## Tech stack

| Part | Technology |
|---|---|
| Frontend | React + TypeScript + Vite + Tailwind CSS + Framer Motion |
| Backend | Node.js + Express + TypeScript |
| Database | MongoDB (Mongoose) |
| Auth | JWT + bcrypt |
| Hosting (recommended) | Vercel (frontend), Render/Railway (backend), MongoDB Atlas (DB) |
