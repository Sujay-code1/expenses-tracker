import express from 'express';
import { register, Login, Logout } from "../controllers/authController.js";

const router = express.Router()

router.post("/register", register);
router.post("/login", Login);
router.get("/logout", Logout);

export default router;


