import { Router } from "express";
import { getStudents, getStudentById, updateStudent } from "../controllers/studentController";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, getStudents);
router.put("/email/:email", authMiddleware, adminMiddleware, updateStudent);
router.get("/:id", authMiddleware, adminMiddleware, getStudentById);

export default router;
