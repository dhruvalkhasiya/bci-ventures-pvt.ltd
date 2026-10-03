# Registration Workbook

Successful registrations are stored in MongoDB and appended to the `Registrations` worksheet in `backend/data/dhruaval.xlsx`. The original `Sheet1` from the supplied workbook is preserved. The new worksheet contains registration ID, submission time, all form fields, and batch selection.

The workbook is ignored by Git because it contains student personal information. For another machine or a deployed backend, securely place the workbook at the configured path and set `REGISTRATIONS_WORKBOOK_PATH` in the backend environment. The default is `./data/dhruaval.xlsx`, resolved from the backend process working directory.

Registration submissions always go to the backend, even while the rest of the frontend is using mock data. Make sure `VITE_API_BASE_URL` points to a running backend. When MongoDB is connected, each registration is saved to both MongoDB and Excel. If MongoDB is unavailable, the API still accepts registrations into the workbook only. When `VITE_USE_MOCK=true`, a successful backend submission is also copied to local storage for the mock admin screen; set it to `false` to use the backend for the rest of the admin data as well. A workbook append failure is reported as an error. Avoid having Excel lock the workbook while registrations are being submitted.

On hosting platforms, use a persistent disk for the workbook. Ephemeral/serverless filesystems can be reset between requests or deployments; for that deployment model, use Microsoft Graph/OneDrive instead of a local workbook path.