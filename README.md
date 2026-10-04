# BCI Ventures - Master Project Repository

Production-ready architecture for **Billionaire Concept Ingenuity Private Limited (BCI)**.

## Project Architecture

```
BCI-Ventures/
│
├── frontend/     # Public BCI Website and Admin Portal (React, Vite, Tailwind CSS)
└── backend/      # Express API Server, Mongoose Models & Vercel Functions
```

---

## Local Quick Start (Development)

### 1. Start Backend API (Port 5000)
```bash
cd backend
npm install
npm run dev
```

### 2. Start Public Frontend (Port 5173)
```bash
cd frontend
npm install
npm run dev
```

The admin portal is part of the public frontend. Open `/admin/login` on the frontend dev server.

---

## Production Deployment to Vercel

### Step 1: Deploy Backend (`/backend`)
1. Import repository to Vercel → Set Root Directory: `backend`
2. Add Environment Variables:
   - `MONGO_URI` = `mongodb+srv://<user>:<password>@cluster0.mongodb.net/bci-ventures`
   - `JWT_SECRET` = `your_secure_jwt_secret`
   - `CLIENT_ORIGIN` = `*`
3. Deploy and copy your backend URL (e.g. `https://bci-ventures-backend.vercel.app`).

### Step 2: Deploy Frontend and Admin Portal (`/frontend`)
1. Import repository to Vercel → Set Root Directory: `frontend`
2. Add Environment Variable:
   - `VITE_API_BASE_URL` = `https://bci-ventures-backend.vercel.app/api`
3. Deploy. The admin portal is available at `/admin/login` on the same domain.

---

## Default Admin Credentials

* **Email**: `admin@bciventures.in`
* **Password**: `Admin@12345`
