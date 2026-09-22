import { Router } from "express";
import { createCertificate, verifyCertificate } from "../controllers/certificateController";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();

router.post("/", authMiddleware, adminMiddleware, createCertificate);
router.get("/verify/:certificateId", verifyCertificate);

export default router;
