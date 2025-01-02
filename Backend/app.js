import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import incomeRouter from "./routes/incomeRoutes.js";
import expenseRouter from "./routes/expenseRoutes.js";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://xpens-eta.vercel.app",
      "https://xpens-git-main-nareshs-projects-1c48ee48.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB CONNECTION
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/incomes", incomeRouter);
app.use("/api/expenses", expenseRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "An internal server error occurred",
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}...`);
});

export default app;
