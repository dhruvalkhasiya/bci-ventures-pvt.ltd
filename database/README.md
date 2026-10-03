# BCI Ventures Database Module

This directory contains the database schemas, TypeScript collection interfaces, and seed configurations for the BCI Ventures platform.

## Database System

- **Database Engine**: MongoDB (Mongoose ODM)
- **Local Dev Engine**: Standalone local MongoDB or disk-backed MongoMemoryServer (`backend/data/mongodb`)
- **Production Engine**: MongoDB Atlas (Cloud Cluster)

## Environment Connection

Set your connection string in `backend/.env`:
```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bci-ventures
```

## Collections & Schemas

| Collection | Schema File | Description |
| :--- | :--- | :--- |
| `courses` | `schemas/CourseSchema.ts` | Course pricing, duration, timing, syllabus module topics & visibility status |
| `users` | `schemas/UserSchema.ts` | Administrator credentials (bcrypt hashed) |
| `registrations` | `schemas/RegistrationSchema.ts` | Student course registrations & batch details |
| `enquiries` | `schemas/EnquirySchema.ts` | Lead enquiries & batch information requests |
| `certificates` | `schemas/CertificateSchema.ts` | Student completion certificate IDs & validation statuses |
| `students` | `schemas/StudentSchema.ts` | Enrolled student profiles & course assignments |

## Rules

- **NEVER** commit database engine binaries, `WiredTiger.lock`, `node_modules`, or database data files to git or production builds.
- Database schemas are declared in `database/schemas/` and consumed directly by `backend/src/models/`.
