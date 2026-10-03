# BCI Ventures - Master Project Repository

Multi-part production architecture for **Billionaire Concept Ingenuity Private Limited (BCI)**.

## Project Architecture

```
BCI-Ventures/
│
├── frontend/     # Public BCI Website (React, Vite, Tailwind)
├── backend/      # Express API Server & Vercel Serverless Function
├── admin/        # Standalone Admin Portal Application (React, Vite)
└── database/     # Mongoose Schemas, Types & Database Documentation
```

## Quick Start (Development)

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

### 3. Start Admin Portal (Port 5174)
```bash
cd admin
npm install
npm run dev
```

## Deployment

- **Frontend**: Deploy `/frontend` to Vercel
- **Admin Panel**: Deploy `/admin` to Vercel
- **Backend API**: Deploy `/backend` to Vercel / Render
- **Database**: MongoDB Atlas Cloud (`MONGO_URI`)
