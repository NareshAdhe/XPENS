import incomeModel from "../models/incomeModel.js";
import expenseModel from "../models/expenseModel.js";

export const addIncome = async (req, res) => {
  const { title, amount, date, time, category, image, userId } = req.body;
  try {
    if (!title || !amount || !date || !time || !category || !image) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    if (isNaN(amount) || Number(amount) <= 0) {
      return res.json({
        success: false,
        message: "Amount should be a positive number",
      });
    }
    await incomeModel.create({
      title,
      amount: Number(amount),
      date,
      time,
      category,
      image,
      userId,
    });

    res.json({
      success: true,
      message: "Income added successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getIncomes = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const incomes = await incomeModel.find({ userId });
    return res.json({
      success: true,
      incomes,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await incomeModel.findById(id);
    res.json({
      success: true,
      income,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteIncome = async (req, res) => {
  const { incomeId } = req.params;
  try {
    if (!incomeId) {
      return res.json({
        success: false,
        message: "Income not found",
      });
    }
    await incomeModel.findByIdAndDelete(incomeId).catch((error) => {
      return res.json({
        success: false,
        message: "Failed to delete income",
      });
    });
    await expenseModel.deleteMany({ incomeId }).catch((err) => {
      return res.json({
        success: false,
        message: "Failed to delete related expenses",
      });
    });
    return res.json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const editIncome = async (req, res) => {
  const { incomeId } = req.params;
  const { title, amount, date, time, category, image } = req.body;
  try {
    if (!title || !date || !time || !category || !image) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.json({
        success: false,
        message: "Amount should be a positive number",
      });
    }
    const income = await incomeModel.findById(incomeId);
    if (!income) {
      return res.json({
        success: false,
        message: "Income not found",
      });
    }
    if (income.spent > Number(amount)) {
      return res.json({
        success: false,
        message:
          "Expenses exceeding the new income amount manupulate income amount or your expenses",
      });
    }
    await incomeModel.findByIdAndUpdate(incomeId, {
      title,
      amount: Number(amount),
      date,
      time,
      category,
      image,
    });
    res.json({
      success: true,
      message: "Income updated successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const dailyIncome = async (req, res) => {
  const { week, month } = req.query;
  const { userId } = req.body;
  console.log("request accepted");
  try {
    if (!week || !month) {
      return res.json({
        success: false,
        message: "Week and month are required",
      });
    }
    const incomes = await incomeModel.find({ userId });
    if (!incomes) {
      console.log("no incomes found");
      return res.json({
        success: true,
        dailyIncomes: [],
      });
    } else console.log("incomes found", incomes);
    const dailyIncomes = Array(12)
      .fill(null)
      .map(() =>
        Array(4)
          .fill(null)
          .map(() => Array(7).fill(0))
      );
    incomes.forEach((income) => {
      let [incomeDate, incomeMonth, incomeYear] = income.date
        .split("-")
        .map(Number);
      let weekIndex = Math.floor((incomeDate - 1) / 7);
      weekIndex = Math.min(weekIndex, 3);
      if (incomeDate <= 28) {
        incomeDate = incomeDate % 7;
        if (incomeDate === 0) incomeDate = 6;
      } else {
        incomeDate = 6;
      }
      console.log(incomeDate, incomeMonth, incomeYear);
      console.log(weekIndex, week, Number(month), incomeMonth);
      if (Number(week) === weekIndex && Number(month) === incomeMonth - 1) {
        dailyIncomes[incomeMonth - 1][weekIndex][incomeDate - 1] +=
          income.amount;
      }
    });
    return res.json({
      success: true,
      dailyIncomes,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const weeklyIncome = async (req, res) => {
  const { month } = req.query;
  const { userId } = req.body;
  try {
    if (!month) {
      return res.json({
        success: false,
        message: "Month is required",
      });
    }
    const incomes = await incomeModel.find({ userId });
    const weeklyIncomes = Array(12)
      .fill(null)
      .map(() => Array(4).fill(0));
    incomes.forEach((income) => {
      const [incomeDate, incomeMonth, incomeYear] = income.date
        .split("-")
        .map(Number);
      let weekIndex = Math.floor((incomeDate - 1) / 7);
      weekIndex = Math.min(weekIndex, 3);
      if (Number(month) === incomeMonth - 1) {
        weeklyIncomes[incomeMonth - 1][weekIndex] += income.amount;
      }
    });
    return res.json({
      success: true,
      weeklyIncomes,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const dailyCategoryIncome = async (req, res) => {
  const { week, month, category } = req.query;
  const { userId } = req.body;
  try {
    if (!week || !month || !category) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    const incomes = await incomeModel.find({ userId, category });
    const dailyCategoryIncomes = Array(12)
      .fill(null)
      .map(() =>
        Array(4)
          .fill(null)
          .map(() => Array(7).fill(0))
      );
    incomes.forEach((income) => {
      let [incomeDate, incomeMonth, incomeYear] = income.date
        .split("-")
        .map(Number);
      let weekIndex = Math.floor((incomeDate - 1) / 7);
      weekIndex = Math.min(weekIndex, 3);
      if (incomeDate <= 28) {
        incomeDate = incomeDate % 7;
        if (incomeDate === 0) incomeDate = 6;
      } else {
        incomeDate = 6;
      }
      if (Number(week) === weekIndex && Number(month) === incomeMonth - 1) {
        dailyCategoryIncomes[incomeMonth - 1][weekIndex][incomeDate - 1] +=
          income.amount;
      }
    });
    return res.json({
      success: true,
      dailyCategoryIncomes,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const weeklyCategoryIncome = async (req, res) => {
  const { month, category } = req.query;
  const { userId } = req.body;
  try {
    if (!month || !category) {
      return res.json({
        success: false,
        message: "Month and Category are required",
      });
    }
    const incomes = await incomeModel.find({ userId, category });
    const weeklyCategoryIncomes = Array(12)
      .fill(null)
      .map(() => Array(4).fill(0));
    incomes.forEach((income) => {
      const [incomeDate, incomeMonth, incomeYear] = income.date
        .split("-")
        .map(Number);
      let weekIndex = Math.floor((incomeDate - 1) / 7);
      weekIndex = Math.min(weekIndex, 3);
      if (Number(month) === incomeMonth - 1) {
        weeklyCategoryIncomes[incomeMonth - 1][weekIndex] += income.amount;
      }
    });
    return res.json({
      success: true,
      weeklyCategoryIncomes,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
