import express from 'express';
import { addExpense, getExpenses, updateExpense, deleteExpense } from "../controllers/expenseController.js"; 
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Matches: /api/expense
router.get("/", protect, getExpenses);
router.post("/", protect, addExpense);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);

export default router;