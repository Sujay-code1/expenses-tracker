import express from 'express';
import dotenv  from 'dotenv';
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import cors from "cors";


dotenv.config();
connectDb();


const app = express();

const port = process.env.PORT || 8000

//middleware
app.use(express.json());
app.use(cookieParser());






app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5175", "http://localhost:5174"],
    credentials: true,              
  })
);


//auth routes
app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/transactions", transactionRoutes);


app.listen(port,()=>{
    console.log(`server running sucessfully ${port}`)
})






