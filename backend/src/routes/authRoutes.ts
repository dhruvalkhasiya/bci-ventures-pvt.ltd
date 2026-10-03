import { Router } from "express";
import { createStudentSession, login, logout } from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.post("/student/session", createStudentSession);
router.post("/logout", logout);

export default router;
