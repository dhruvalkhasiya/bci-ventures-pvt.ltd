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
}));
app.use(express.json());

app.get("/api/health", (_req, res) => {
	const databaseReady = mongoose.connection.readyState === 1;
	const databaseState = ["disconnected", "connected", "connecting", "disconnecting"][mongoose.connection.readyState] || "unknown";
	return res.status(databaseReady ? 200 : 503).json({
		status: databaseReady ? "ok" : "degraded",
		database: databaseState,
	});
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/certificates", certificateRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
