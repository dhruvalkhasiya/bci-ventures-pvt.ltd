import { Router } from "express";
import { getCourses, getAdminCourses, getCourseById, createCourse, updateCourse, deleteCourse } from "../controllers/courseController";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();

router.get("/", getCourses);
router.get("/admin", authMiddleware, adminMiddleware, getAdminCourses);
router.get("/:id", getCourseById);
router.post("/", authMiddleware, adminMiddleware, createCourse);
router.put("/:id", authMiddleware, adminMiddleware, updateCourse);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCourse);

export default router;
