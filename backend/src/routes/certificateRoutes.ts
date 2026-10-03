import { Router } from "express";
import { createCertificate, getCertificates, revokeCertificate, verifyCertificate } from "../controllers/certificateController";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, getCertificates);
router.post("/", authMiddleware, adminMiddleware, createCertificate);
router.put("/:certificateId/revoke", authMiddleware, adminMiddleware, revokeCertificate);
router.get("/verify/:certificateId", verifyCertificate);

export default router;
