import { Router } from "express";
import {
  createRegistration,
  getRegistrations,
  getRegistrationById,
  updateRegistration,
} from "../controllers/registrationController";
import { validateRegistration } from "../middleware/validationMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();

router.post("/", validateRegistration, createRegistration);
router.get("/", authMiddleware, adminMiddleware, getRegistrations);
router.get("/:id", authMiddleware, adminMiddleware, getRegistrationById);
router.put("/:id", authMiddleware, adminMiddleware, updateRegistration);

export default router;
