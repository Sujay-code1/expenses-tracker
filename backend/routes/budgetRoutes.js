import express from "express";
import { setBudget, updateBudget, resetBudget, getBudgetReport } from "../controllers/budgetController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/set", protect, setBudget);
router.put("/update", protect, updateBudget);
router.delete("/reset", protect, resetBudget);
router.get("/report", protect, getBudgetReport);

export default router;