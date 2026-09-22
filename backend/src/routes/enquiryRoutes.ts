import { Router } from "express";
import { createEnquiry, getEnquiries, updateEnquiry } from "../controllers/enquiryController";
import { validateEnquiry } from "../middleware/validationMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();

router.post("/", validateEnquiry, createEnquiry);
router.get("/", authMiddleware, adminMiddleware, getEnquiries);
router.put("/:id", authMiddleware, adminMiddleware, updateEnquiry);

export default router;
