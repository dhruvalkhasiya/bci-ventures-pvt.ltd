import { Router } from "express";
import { getStudents, getStudentById, updateStudent } from "../controllers/studentController";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, getStudents);
router.get("/:id", authMiddleware, adminMiddleware, getStudentById);
router.put("/:id", authMiddleware, adminMiddleware, updateStudent);

export default router;
