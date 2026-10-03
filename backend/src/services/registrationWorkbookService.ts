import ExcelJS from "exceljs";
import path from "node:path";
import fs from "node:fs";
import { env } from "../config/environment";

export interface RegistrationWorkbookRow {
  registrationId: string;
  fullName: string;
  email: string;
  mobile: string;
  course: string;
  city: string;
  profession: string;
  date: string;
  preferredBatch: string;
  message: string;
  submittedAt: Date;
}

const worksheetName = "Registrations";
let pendingWrite = Promise.resolve();

export function getWorkbookAbsolutePath(): string {
  return path.resolve(process.cwd(), env.registrationsWorkbookPath);
}

const COLUMNS_DEF = [
  { header: "Registration ID", key: "registrationId", width: 28 },
  { header: "Submitted At", key: "submittedAt", width: 22 },
  { header: "Full Name", key: "fullName", width: 28 },
  { header: "Email", key: "email", width: 32 },
  { header: "Mobile", key: "mobile", width: 20 },
  { header: "Course", key: "course", width: 28 },
  { header: "City", key: "city", width: 22 },
  { header: "Education / Profession", key: "profession", width: 28 },
  { header: "Date", key: "date", width: 16 },
  { header: "Batch", key: "preferredBatch", width: 20 },
  { header: "Message", key: "message", width: 48 },
];

function setupWorksheet(worksheet: ExcelJS.Worksheet) {
  worksheet.columns = COLUMNS_DEF;
  worksheet.views = [{ state: "frozen", ySplit: 1 }];
  worksheet.getRow(1).font = { bold: true };
}

export function appendRegistrationToWorkbook(registration: RegistrationWorkbookRow): Promise<void> {
  const write = pendingWrite.then(async () => {
    const workbook = new ExcelJS.Workbook();
    const workbookPath = getWorkbookAbsolutePath();

    // Ensure directory exists
    const dir = path.dirname(workbookPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(workbookPath)) {
      await workbook.xlsx.readFile(workbookPath);
    }

    let regSheet = workbook.getWorksheet(worksheetName);
    if (!regSheet) regSheet = workbook.addWorksheet(worksheetName);
    setupWorksheet(regSheet);

    let sheet1 = workbook.getWorksheet("Sheet1");
    if (!sheet1) sheet1 = workbook.addWorksheet("Sheet1");
    setupWorksheet(sheet1);

    const formattedTime = registration.submittedAt.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const rowData = {
      registrationId: registration.registrationId,
      submittedAt: formattedTime,
      fullName: registration.fullName,
      email: registration.email,
      mobile: registration.mobile,
      course: registration.course,
      city: registration.city,
      profession: registration.profession,
      date: registration.date,
      preferredBatch: registration.preferredBatch,
      message: registration.message,
    };

    [regSheet, sheet1].forEach((ws) => {
      const col1Values = ws.getColumn(1).values as any[];
      if (!col1Values || !col1Values.some((id) => String(id) === registration.registrationId)) {
        ws.addRow(rowData);
      }
    });

    await workbook.xlsx.writeFile(workbookPath);
  });

  pendingWrite = write.catch((err) => {
    console.error("Workbook write error:", err);
    return undefined;
  });
  return write;
}

export async function readRegistrationsFromWorkbook(): Promise<RegistrationWorkbookRow[]> {
  const workbookPath = getWorkbookAbsolutePath();
  if (!fs.existsSync(workbookPath)) return [];

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(workbookPath);
  const worksheet = workbook.getWorksheet(worksheetName) || workbook.getWorksheet("Sheet1");
  if (!worksheet) return [];

  const rows: RegistrationWorkbookRow[] = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // Skip header
    const values = row.values as any[];
    if (!values || values.length < 4) return;

    const registrationId = String(values[1] || "").trim();
    const submittedAtRaw = values[2];
    const fullName = String(values[3] || "").trim();
    const email = String(values[4] || "").trim();
    const mobile = String(values[5] || "").trim();
    const course = String(values[6] || "").trim();
    const city = String(values[7] || "").trim();
    const profession = String(values[8] || "").trim();
    const date = String(values[9] || "").trim();
    const preferredBatch = String(values[10] || "").trim();
    const message = String(values[11] || "").trim();

    if (fullName && email && fullName !== "Full Name") {
      rows.push({
        registrationId,
        submittedAt: submittedAtRaw ? new Date(submittedAtRaw) : new Date(),
        fullName,
        email,
        mobile,
        course,
        city,
        profession,
        date,
        preferredBatch,
        message,
      });
    }
  });

  return rows;
}