import express from "express";
import {
  addIncome,
  dailyCategoryIncome,
  dailyIncome,
  deleteIncome,
  editIncome,
  getIncome,
  getIncomes,
  weeklyCategoryIncome,
  weeklyIncome,
} from "../controllers/incomeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const incomeRouter = express.Router();

incomeRouter.post("/addIncome", authMiddleware, addIncome);
incomeRouter.get("/getIncomes", authMiddleware, getIncomes);
incomeRouter.get("/getIncome/:id", authMiddleware, getIncome);
incomeRouter.delete("/deleteIncome/:incomeId", authMiddleware, deleteIncome);
incomeRouter.post("/editIncome/:incomeId", authMiddleware, editIncome);
incomeRouter.get("/dailyIncome", authMiddleware, dailyIncome);
incomeRouter.get("/weeklyIncome", authMiddleware, weeklyIncome);
incomeRouter.get("/dailyCategoryIncome", authMiddleware, dailyCategoryIncome);
incomeRouter.get("/weeklyCategoryIncome", authMiddleware, weeklyCategoryIncome);
export default incomeRouter;
