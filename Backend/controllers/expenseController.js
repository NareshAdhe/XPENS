import expenseModel from "../models/expenseModel.js";
import incomeModel from "../models/incomeModel.js";
import userModel from "../models/userModel.js";

export const addExpense = async (req, res) => {
  const {
    name,
    amount,
    date,
    time,
    incomeId = null,
    category,
    userId,
    noIncome = false,
  } = req.body;
  try {
    if (
      !name ||
      !amount ||
      !date ||
      !time ||
      (!incomeId && !noIncome) ||
      !category
    ) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.json({
        success: false,
        message: "Amount must be a positive number",
      });
    }
    if (incomeId) {
      const income = await incomeModel.findById(incomeId);
      if (!income) {
        return res.json({
          success: false,
          message: "Income record not found",
        });
      }
      if (Number(amount) > income.amount - income.spent) {
        return res.json({
          success: false,
          message: "Insufficient funds",
        });
      }
      income.spent = Number(amount) + income.spent;
      await income.save();
    } else {
      const user = await userModel.findById(userId);
      user.standAloneExpense = user.standAloneExpense + Number(amount);
      await user.save();
    }

    const expenseData = {
      name,
      amount: Number(amount),
      date,
      time,
      userId,
      category,
    };

    if (incomeId) expenseData.incomeId = incomeId;
    await expenseModel.create(expenseData);
    return res.json({
      success: true,
      message: "Expense added successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getBudgetExpenses = async (req, res) => {
  const { incomeId } = req.params;
  try {
    if (!incomeId) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }
    const expenses = await expenseModel.find({ incomeId });
    console.log(expenses);
    return res.json({
      success: true,
      expenses,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBudgetExpense = async (req, res) => {
  const { expenseId, incomeId } = req.params;
  console.log(
    `Deleting expense with ID: ${expenseId}, under income ID: ${incomeId}`
  );
  try {
    if (!expenseId || !incomeId) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    const expense = await expenseModel.findByIdAndDelete(expenseId);
    const income = await incomeModel.findById(incomeId);
    income.spent -= expense.amount;
    await income.save();
    if (!expense) {
      return res.json({
        success: false,
        message: "Expense not found",
      });
    }
    return res.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const editExpense = async (req, res) => {
  const { incomeId, name, amount, date, time, category } = req.body;
  const { expenseId } = req.params;
  try {
    if (!name || !date || !time || !category) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.json({
        success: false,
        message: "Amount must be a positive number",
      });
    }
    if (!expenseId) {
      return res.json({
        success: false,
        message: "Expense not found",
      });
    }
    if (!incomeId) {
      return res.json({
        success: false,
        message: "Income not found",
      });
    }
    const income = await incomeModel.findById(incomeId);
    if (Number(amount) > income.amount - income.spent) {
      return res.json({
        success: false,
        message: "Insufficient funds",
      });
    }
    if (!income) {
      return res.json({
        success: false,
        message: "Income not found",
      });
    }
    const expense = await expenseModel.findById(expenseId);
    if (!expense) {
      return res.json({
        success: false,
        message: "Expense not found",
      });
    }
    const updatedExpense = await expenseModel.findByIdAndUpdate(expenseId, {
      name,
      amount: Number(amount),
      date,
      time,
      category,
    });
    if (!updatedExpense) {
      return res.json({
        success: false,
        message: "Failed to update expense",
      });
    }
    income.spent = income.spent - expense.amount + Number(amount);
    await income.save();
    res.json({
      success: true,
      message: "Expense updated successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getExpenses = async (req, res) => {
  const { userId } = req.body;
  try {
    const expenses = await expenseModel.find({ userId });
    res.json({
      success: true,
      expenses,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteExpense = async (req, res) => {
  const { expenseId } = req.params;
  try {
    const expense = await expenseModel.findById(expenseId);
    if (!expense) {
      return res.json({
        success: false,
        message: "Expense not found",
      });
    }
    const incomeId = expense.incomeId;
    const income = await incomeModel.findById(incomeId);
    await expenseModel.findByIdAndDelete(expenseId);
    income.spent -= expense.amount;
    await income.save();
    return res.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteStandAlone = async (req, res) => {
  const { expenseId } = req.params;
  const { userId } = req.body;
  console.log(expenseId);
  try {
    if (!expenseId) {
      return res.json({
        success: false,
        message: "Expense not found",
      });
    }
    const user = await userModel.findById(userId);
    const expense = await expenseModel.findById(expenseId);
    if (!expense) {
      return res.json({
        success: false,
        message: "Expense not found",
      });
    }
    await expenseModel.findByIdAndDelete(expenseId);
    user.standAloneExpense -= expense.amount;
    await user.save();
    return res.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const editStandAlone = async (req, res) => {
  const { expenseId } = req.params;
  const { name, amount, category, date, time, userId } = req.body;
  try {
    if (!name || !date || !time || !category) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.json({
        success: false,
        message: "Amount must be a positive number",
      });
    }
    if (!expenseId) {
      return res.json({
        success: false,
        message: "Expense not found",
      });
    }
    const user = await userModel.findById(userId);
    const expense = await expenseModel.findById(expenseId);
    if (!expense) {
      return res.json({
        success: false,
        message: "Expense not found",
      });
    }
    console.log("prev expense: ", user.standAloneExpense);
    user.standAloneExpense = user.standAloneExpense - expense.amount;
    const updatedExpense = await expenseModel.findByIdAndUpdate(
      expenseId,
      {
        name,
        amount: Number(amount),
        category,
        date,
        time,
      },
      { new: true }
    );
    if (!updatedExpense) {
      return res.json({
        success: false,
        message: "Failed to update expense",
      });
    }
    user.standAloneExpense += updatedExpense.amount;
    await user.save();
    console.log("new expense: ", user.standAloneExpense);
    return res.json({
      success: true,
      message: "Expense updated successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const dailyExpense = async (req, res) => {
  const { week, month } = req.query;
  const { userId } = req.body;
  try {
    if (!week || !month) {
      return res.json({
        success: false,
        message: "Week and month are required",
      });
    }
    const expenses = await expenseModel.find({ userId });
    const dailyExpenses = Array(12)
      .fill(null)
      .map(() =>
        Array(4)
          .fill(null)
          .map(() => Array(7).fill(0))
      );
    expenses.forEach((expense) => {
      let [expenseDate, expenseMonth, expenseYear] = expense.date
        .split("-")
        .map(Number);
      const date = new Date(expenseYear, expenseMonth - 1, expenseDate);
      const dayOfWeek = date.getDay() - 1;
      let weekIndex = Math.floor((expenseDate - 1) / 7);
      weekIndex = Math.min(weekIndex, 3);
      if (Number(week) === weekIndex && Number(month) === expenseMonth - 1) {
        dailyExpenses[expenseMonth - 1][weekIndex][dayOfWeek] += expense.amount;
      }
    });
    return res.json({
      success: true,
      dailyExpenses,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const weeklyExpense = async (req, res) => {
  const { month } = req.query;
  const { userId } = req.body;
  try {
    if (!month) {
      return res.json({
        success: false,
        message: "Month is required",
      });
    }
    const expenses = await expenseModel.find({ userId });
    const weeklyExpenses = Array(12)
      .fill(null)
      .map(() => Array(4).fill(0));
    expenses.forEach((expense) => {
      let [expenseDate, expenseMonth, expenseYear] = expense.date
        .split("-")
        .map(Number);
      let weekIndex = Math.floor((expenseDate - 1) / 7);
      weekIndex = Math.min(weekIndex, 3);
      if (Number(month) === expenseMonth - 1) {
        weeklyExpenses[expenseMonth - 1][weekIndex] += expense.amount;
      }
    });
    return res.json({
      success: true,
      weeklyExpenses,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const dailyCategoryExpense = async (req, res) => {
  const { week, month, category } = req.query;
  const { userId } = req.body;
  try {
    if (!week || !month || !category) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    const expenses = await expenseModel.find({ userId, category });
    const dailyCategoryExpenses = Array(12)
      .fill(null)
      .map(() =>
        Array(4)
          .fill(null)
          .map(() => Array(7).fill(0))
      );
    expenses.forEach((expense) => {
      let [expenseDate, expenseMonth, expenseYear] = expense.date
        .split("-")
        .map(Number);
      const date = new Date(expenseYear, expenseMonth - 1, expenseDate);
      const dayOfWeek = date.getDay() - 1;
      let weekIndex = Math.floor((expenseDate - 1) / 7);
      weekIndex = Math.min(weekIndex, 3);
      if (Number(week) === weekIndex && Number(month) === expenseMonth - 1) {
        dailyCategoryExpenses[expenseMonth - 1][weekIndex][dayOfWeek] +=
          expense.amount;
      }
    });
    return res.json({
      success: true,
      dailyCategoryExpenses,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const weeklyCategoryExpense = async (req, res) => {
  const { month, category } = req.query;
  const { userId } = req.body;
  try {
    if (!month || !category) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    const expenses = await expenseModel.find({ userId, category });
    const weeklyCategoryExpenses = Array(12)
      .fill(null)
      .map(() => Array(4).fill(0));
    expenses.forEach((expense) => {
      let [expenseDate, expenseMonth, expenseYear] = expense.date
        .split("-")
        .map(Number);
      let weekIndex = Math.floor((expenseDate - 1) / 7);
      weekIndex = Math.min(weekIndex, 3);
      if (Number(month) === expenseMonth - 1) {
        weeklyCategoryExpenses[expenseMonth - 1][weekIndex] += expense.amount;
      }
    });
    return res.json({
      success: true,
      weeklyCategoryExpenses,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
