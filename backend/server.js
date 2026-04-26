import express from 'express';
import dotenv from 'dotenv';
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import cors from "cors";

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Connect Database
connectDb();

const app = express();

// Port
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://unique-smakager-7570a5.netlify.app",
       "https://expenses-tracker-nmb3q2oye-sujay-paramaniks-projects.vercel.app"
    ],
    credentials: true,
  })
);

// Test Route
app.get("/", (req, res) => {
  res.json({
    activeStatus: true,
    error: false
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/transactions", transactionRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;