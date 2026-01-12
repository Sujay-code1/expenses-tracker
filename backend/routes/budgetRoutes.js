import express from "express";
import { setBudget, getBudgetReport } from "../controllers/budgetController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/set", protect, setBudget);
router.get("/report", protect, getBudgetReport);

export default router;