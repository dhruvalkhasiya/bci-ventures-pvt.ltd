import { Router } from "express";
import {
  createRegistration,
  getRegistrations,
  getRegistrationById,
  updateRegistration,
  downloadWorkbook,
  syncWorkbook,
  updateEmailSettings,
} from "../controllers/registrationController";
import { validateRegistration } from "../middleware/validationMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();

router.post("/", validateRegistration, createRegistration);
router.post("/settings/email", authMiddleware, adminMiddleware, updateEmailSettings);
router.get("/export-excel", authMiddleware, adminMiddleware, downloadWorkbook);
router.post("/sync-excel", authMiddleware, adminMiddleware, syncWorkbook);
router.get("/", authMiddleware, adminMiddleware, getRegistrations);
router.get("/:id", authMiddleware, adminMiddleware, getRegistrationById);
router.put("/:id", authMiddleware, adminMiddleware, updateRegistration);

export default router;
