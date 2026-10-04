import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { env } from "./config/environment";
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware";

import authRoutes from "./routes/authRoutes";
import courseRoutes from "./routes/courseRoutes";
import studentRoutes from "./routes/studentRoutes";
import enquiryRoutes from "./routes/enquiryRoutes";
import registrationRoutes from "./routes/registrationRoutes";
import certificateRoutes from "./routes/certificateRoutes";

const app = express();

app.use(cors({
	origin(origin, callback) {
		const isVercelDomain = origin && (origin.endsWith(".vercel.app") || origin.includes("vercel.app"));
		const isWildcard = process.env.CLIENT_ORIGIN === "*" || env.clientOrigins.includes("*");
		const localDevelopmentOrigin = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin || "");
		
		if (!origin || isWildcard || env.clientOrigins.includes(origin) || isVercelDomain || localDevelopmentOrigin) {
			return callback(null, true);
		}
		return callback(new Error("Origin is not allowed by CORS"));
	},
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
}));
app.use(express.json());

app.get("/", (_req, res) => {
	return res.json({
		status: "ok",
		service: "BCI Backend API",
		health: "/api/health",
	});
});

app.get("/api", (_req, res) => {
	return res.json({
		status: "ok",
		service: "BCI Backend API",
		health: "/api/health",
	});
});

import Registration from "./models/Registration";
import Enquiry from "./models/Enquiry";
import Course from "./models/Course";
import { success, failure } from "./utils/response";

const getHealthHandler = (_req: any, res: any) => {
	const databaseReady = mongoose.connection.readyState === 1;
	const databaseState = ["disconnected", "connected", "connecting", "disconnecting"][mongoose.connection.readyState] || "unknown";
	return res.status(databaseReady ? 200 : 503).json({
		status: databaseReady ? "ok" : "degraded",
		service: "BCI Backend API",
		database: databaseState,
	});
};

const getAdminStatsHandler = async (_req: any, res: any) => {
	try {
		let totalRegistrations = 0;
		let newEnquiries = 0;
		let publishedCourses = 0;
		let enrolledStudents = 0;

		if (mongoose.connection.readyState === 1) {
			totalRegistrations = await Registration.countDocuments();
			newEnquiries = await Enquiry.countDocuments({ status: "New" });
			publishedCourses = await Course.countDocuments({ status: "published" });
			const registrations = await Registration.find().select("email");
			enrolledStudents = new Set(registrations.map((r) => (r.email || "").toLowerCase())).size;
		}

		return success(
			res,
			{
				totalRegistrations,
				newEnquiries,
				publishedCourses,
				enrolledStudents,
			},
			"Admin dashboard stats retrieved successfully",
		);
	} catch (err: any) {
		return success(
			res,
			{
				totalRegistrations: 0,
				newEnquiries: 0,
				publishedCourses: 0,
				enrolledStudents: 0,
			},
			`Admin stats fallback: ${err.message || "Database connecting"}`,
		);
	}
};

app.get("/api/health", getHealthHandler);
app.get("/health", getHealthHandler);

app.get("/api/admin/stats", getAdminStatsHandler);
app.get("/admin/stats", getAdminStatsHandler);

app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

app.use("/api/courses", courseRoutes);
app.use("/courses", courseRoutes);

app.use("/api/students", studentRoutes);
app.use("/students", studentRoutes);

app.use("/api/enquiries", enquiryRoutes);
app.use("/enquiries", enquiryRoutes);

app.use("/api/registrations", registrationRoutes);
app.use("/registrations", registrationRoutes);

app.use("/api/certificates", certificateRoutes);
app.use("/certificates", certificateRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
