import { Request, Response } from "express";
import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import Registration from "../models/Registration";
import Course from "../models/Course";
import { success, failure } from "../utils/response";
import {
  appendRegistrationToWorkbook,
  getWorkbookAbsolutePath,
  readRegistrationsFromWorkbook,
} from "../services/registrationWorkbookService";
import { sendRegistrationNotification, sendStudentConfirmationEmail, sendEmail } from "../services/emailService";

const COURSE_TITLE_MAP: Record<string, string> = {
  "demo-class": "AI Demo Class",
  beginner: "AI Beginner Batch",
  advanced: "AI Advanced Batch",
};

async function getDisplayCourseTitle(courseInput: string): Promise<string> {
  if (!courseInput) return "";
  const key = courseInput.trim().toLowerCase();
  if (COURSE_TITLE_MAP[key]) return COURSE_TITLE_MAP[key];

  try {
    const found =
      (await Course.findOne({ slug: courseInput })) ||
      (/^[a-f\d]{24}$/i.test(courseInput) ? await Course.findById(courseInput) : null);
    if (found && found.title) return found.title;
  } catch {
    // ignore lookup error
  }
  return courseInput;
}

function serializeRegistration(registration: any) {
  const record = registration.toObject ? registration.toObject() : registration;
  return {
    id: String(record._id),
    fullName: record.name,
    email: record.email,
    mobile: record.phone,
    course: record.courseId,
    city: record.city,
    profession: record.profession || "",
    date: record.date || "",
    preferredBatch: record.preferredBatch || "",
    message: record.message || "",
    status: record.status || "Pending",
    emailPreviewUrl: record.emailPreviewUrl || null,
    createdAt: record.createdAt,
  };
}

export async function createRegistration(req: Request, res: Response) {
  try {
    const fullName = (req.body.fullName || req.body.name || "Student").trim();
    const email = (req.body.email || "").trim().toLowerCase();
    const mobile = (req.body.mobile || req.body.phone || "").trim();
    const courseInput = req.body.course || req.body.courseId || "";
    const displayCourse = await getDisplayCourseTitle(courseInput);
    const city = (req.body.city || "Not Specified").trim();
    const profession = (req.body.profession || "").trim();
    const dateInput = req.body.date || req.body.startDate || "";
    const submissionDate = dateInput || new Date().toLocaleDateString("en-IN");
    const preferredBatch = req.body.preferredBatch || "";
    const message = req.body.message || "";

    if (mongoose.connection.readyState !== 1) {
      const createdAt = new Date();
      const id = randomUUID();
      await appendRegistrationToWorkbook({
        registrationId: id,
        fullName,
        email: email.toLowerCase(),
        mobile,
        course: displayCourse,
        city,
        profession: profession || "",
        date: submissionDate,
        preferredBatch: preferredBatch || "",
        message: message || "",
        submittedAt: createdAt,
      });

      const previewUrl = await sendRegistrationNotification({
        fullName,
        email: email.toLowerCase(),
        mobile,
        course: displayCourse,
        city,
        profession,
        preferredBatch,
        message,
        submittedAt: createdAt,
      });

      void sendStudentConfirmationEmail({
        fullName,
        email: email.toLowerCase(),
        mobile,
        course: displayCourse,
        city,
        profession,
        preferredBatch,
        message,
        submittedAt: createdAt,
      });

      return success(
        res,
        {
          id,
          fullName,
          email: email.toLowerCase(),
          mobile,
          course: displayCourse,
          city,
          profession: profession || "",
          date: submissionDate,
          preferredBatch: preferredBatch || "",
          message: message || "",
          status: "Pending",
          emailPreviewUrl: previewUrl,
          createdAt,
        },
        "Registration saved successfully!",
        201,
      );
    }

    const registration = await Registration.create({
      name: fullName,
      email: email.toLowerCase(),
      phone: mobile,
      courseId: displayCourse,
      city,
      profession,
      date: submissionDate,
      preferredBatch,
      message,
    });

    try {
      await appendRegistrationToWorkbook({
        registrationId: String(registration._id),
        fullName,
        email: email.toLowerCase(),
        mobile,
        course: displayCourse,
        city,
        profession: profession || "",
        date: submissionDate,
        preferredBatch: preferredBatch || "",
        message: message || "",
        submittedAt: registration.createdAt || new Date(),
      });
    } catch (workbookError) {
      console.warn("Registration saved to MongoDB; workbook append skipped (expected on cloud environment):", workbookError);
    }

    // Trigger email notification to registrationbci@gmail.com
    const previewUrl = await sendRegistrationNotification({
      fullName,
      email: email.toLowerCase(),
      mobile,
      course: displayCourse,
      city,
      profession,
      preferredBatch,
      message,
      submittedAt: registration.createdAt || new Date(),
    });

    // Also trigger welcome & confirmation email to the student
    void sendStudentConfirmationEmail({
      fullName,
      email: email.toLowerCase(),
      mobile,
      course: displayCourse,
      city,
      profession,
      preferredBatch,
      message,
      submittedAt: registration.createdAt || new Date(),
    });

    if (previewUrl) {
      registration.emailPreviewUrl = previewUrl;
      await registration.save();
    }

    return success(res, serializeRegistration(registration), "Registration submitted successfully!", 201);
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}

export async function getRegistrations(req: Request, res: Response) {
  try {
    const { status, courseId } = req.query;
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (courseId) filter.courseId = courseId;

    if (mongoose.connection.readyState === 1) {
      try {
        const rows = await readRegistrationsFromWorkbook();
        for (const row of rows) {
          if (!row.email) continue;
          const existing = await Registration.findOne({ email: row.email.toLowerCase(), courseId: row.course });
          if (!existing) {
            await Registration.create({
              name: row.fullName || "Student",
              email: row.email.toLowerCase(),
              phone: row.mobile || "",
              courseId: row.course || "AI Course",
              city: row.city || "Not Specified",
              profession: row.profession || "",
              date: row.date || "",
              preferredBatch: row.preferredBatch || "",
              message: row.message || "",
              createdAt: row.submittedAt || new Date(),
            });
          }
        }
      } catch {
        // ignore workbook read error
      }
    }

    const registrations = await Registration.find(filter).sort({ createdAt: -1 });
    return success(res, registrations.map(serializeRegistration));
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function getRegistrationById(req: Request, res: Response) {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) return failure(res, "Registration not found", 404);
    return success(res, serializeRegistration(registration));
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function updateRegistration(req: Request, res: Response) {
  try {
    const updates: Record<string, unknown> = {};
    if (req.body.status) updates.status = req.body.status;
    const registration = await Registration.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!registration) return failure(res, "Registration not found", 404);
    return success(res, serializeRegistration(registration), "Registration updated");
  } catch (err: any) {
    return failure(res, err.message, 400);
  }
}

export async function downloadWorkbook(_req: Request, res: Response) {
  try {
    const workbookPath = getWorkbookAbsolutePath();
    if (!fs.existsSync(workbookPath)) {
      return failure(res, "Workbook file does not exist yet.", 404);
    }
    return res.download(workbookPath, "dhruaval.xlsx");
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function syncWorkbook(_req: Request, res: Response) {
  try {
    const rows = await readRegistrationsFromWorkbook();
    let synced = 0;
    for (const row of rows) {
      const existing = await Registration.findOne({ email: row.email, courseId: row.course });
      if (!existing) {
        await Registration.create({
          name: row.fullName,
          email: row.email,
          phone: row.mobile,
          courseId: row.course,
          city: row.city,
          profession: row.profession,
          date: row.date,
          preferredBatch: row.preferredBatch,
          message: row.message,
          createdAt: row.submittedAt,
        });
        synced++;
      }
    }
    return success(res, { syncedTotal: synced }, `Synced ${synced} registrations from Excel workbook!`);
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}

export async function updateEmailSettings(req: Request, res: Response) {
  try {
    const { notificationEmail, smtpPass } = req.body;
    const targetEmail = (notificationEmail || "registrationbci@gmail.com").trim();
    const appPassword = (smtpPass || "").trim();

    process.env.NOTIFICATION_EMAIL = targetEmail;
    process.env.SMTP_USER = targetEmail;
    if (appPassword) {
      process.env.SMTP_PASS = appPassword;
    }

    const envPath = path.resolve(process.cwd(), ".env");
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : "";

    const updateEnvKey = (key: string, val: string) => {
      const regex = new RegExp(`^${key}=.*$`, "m");
      if (regex.test(envContent)) {
        envContent = envContent.replace(regex, `${key}=${val}`);
      } else {
        envContent += `\n${key}=${val}`;
      }
    };

    updateEnvKey("NOTIFICATION_EMAIL", targetEmail);
    updateEnvKey("SMTP_USER", targetEmail);
    if (appPassword) {
      updateEnvKey("SMTP_PASS", appPassword);
    }
    try {
      fs.writeFileSync(envPath, envContent, "utf-8");
    } catch (fsError) {
      console.warn("Could not write to local .env file (expected on cloud environment):", fsError);
    }

    const previewUrl = await sendEmail(
      targetEmail,
      `🎓 BCI Email Setup Verified: ${targetEmail}`,
      `<div style="font-family: Arial, sans-serif; padding: 20px; color: #0b1e36;">
        <h2>BCI Email Notification Active!</h2>
        <p>This is a live test notification confirming that email notifications for <strong>${targetEmail}</strong> are working!</p>
      </div>`,
    );

    return success(
      res,
      { notificationEmail: targetEmail, previewUrl },
      "Email notification settings updated! A live test email has been dispatched.",
    );
  } catch (err: any) {
    return failure(res, err.message, 500);
  }
}
