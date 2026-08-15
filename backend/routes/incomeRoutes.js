import express from 'express';
import { addIncome, getIncomes, updateIncome, deleteIncome } from "../controllers/incomeController.js"; // Plural 's'
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// This matches: GET http://localhost:5000/api/income
router.get("/", protect, getIncomes); 
// This matches: POST http://localhost:5000/api/income
router.post("/", protect, addIncome);
router.put("/:id", protect, updateIncome);

router.delete("/:id", protect, deleteIncome);

export default router;