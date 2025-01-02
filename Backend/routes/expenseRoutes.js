import express from "express";
import {
  addExpense,
  dailyCategoryExpense,
  dailyExpense,
  deleteBudgetExpense,
  deleteExpense,
  deleteStandAlone,
  editExpense,
  editStandAlone,
  getBudgetExpenses,
  getExpenses,
  weeklyCategoryExpense,
  weeklyExpense,
} from "../controllers/expenseController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const expenseRouter = express.Router();

expenseRouter.post("/addExpense", authMiddleware, addExpense);
expenseRouter.get(
  "/getBudgetExpenses/:incomeId",
  authMiddleware,
  getBudgetExpenses
);
expenseRouter.delete(
  "/deleteBudgetExpense/:incomeId/:expenseId",
  authMiddleware,
  deleteBudgetExpense
);
expenseRouter.post("/editExpense/:expenseId", authMiddleware, editExpense);
expenseRouter.get("/getExpenses", authMiddleware, getExpenses);
expenseRouter.delete(
  "/deleteExpense/:expenseId",
  authMiddleware,
  deleteExpense
);
expenseRouter.delete(
  "/deleteStandAlone/:expenseId",
  authMiddleware,
  deleteStandAlone
);
expenseRouter.post(
  "/editStandAlone/:expenseId",
  authMiddleware,
  editStandAlone
);

expenseRouter.get("/dailyExpense", authMiddleware, dailyExpense);
expenseRouter.get("/weeklyExpense", authMiddleware, weeklyExpense);
expenseRouter.get(
  "/dailyCategoryExpense",
  authMiddleware,
  dailyCategoryExpense
);
expenseRouter.get(
  "/weeklyCategoryExpense",
  authMiddleware,
  weeklyCategoryExpense
);
export default expenseRouter;
