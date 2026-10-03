# Student and Admin Sign-In Setup

The app has separate sign-in paths:

- Students use Firebase Authentication with Google or phone-number verification (SMS OTP).
- Administrators use the existing email/password endpoint and a seeded `admin` role. Student tokens cannot access admin-only API routes.

## Firebase Setup

1. Create or select a Firebase project and add a Web App.
2. In Firebase Console → Authentication → Sign-in method, enable **Google** and **Phone**.
3. Add `localhost` and the production website host to Firebase Authentication's authorized domains. Phone sign-in also uses Firebase's reCAPTCHA and SMS verification/quota rules.
4. Copy the Firebase Web App's API key, Auth domain, Project ID, and App ID into the frontend environment:

   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`

5. Configure the backend with the same `FIREBASE_PROJECT_ID`. Give the backend Firebase Admin credentials using Application Default Credentials or `GOOGLE_APPLICATION_CREDENTIALS` pointing to a service-account JSON file. Never commit that JSON file or paste private service-account keys into source files.

The backend verifies each Firebase ID token, allows only Google and phone providers, creates/loads a student account, and issues the BCI JWT used by the API.

## Database and Admin Setup

1. Configure `MONGO_URI` and a long random `JWT_SECRET` in `backend/.env`.
2. Set `ADMIN_NAME`, `ADMIN_EMAIL`, and a strong `ADMIN_PASSWORD` in `backend/.env`.
3. Run `npm run admin:create` from `backend` once to create the administrator. The script refuses to overwrite an existing account.
4. Set the frontend `VITE_API_BASE_URL` to the backend API and set `VITE_USE_MOCK=false` before testing protected admin workflows. The mock admin mode intentionally accepts any credentials and is for local demos only.
5. Start the backend and frontend. Test Google and phone login at `/login`; use `/admin/login` for the administrator account.

## Still Required Before Live Use

- Firebase project/provider settings and authorized domains.
- Firebase Admin Application Default Credentials on the backend host.
- A reachable MongoDB database and configured JWT secret.
- An administrator password supplied locally through the backend environment, then `npm run admin:create`.
- Confirm Firebase SMS quotas, billing requirements, privacy notice, and phone-number consent requirements for the countries where students will sign in.