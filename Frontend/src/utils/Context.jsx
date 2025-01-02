import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const Context = ({ children }) => {
  const backendURI = import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL;
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [budgetList, setBudgetList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [user, setUser] = useState({});
  const [budgetExpenseList, setBudgetExpenseList] = useState([]);
  const [updateBudget, setUpdateBudget] = useState(false);
  const [updateExpense, setUpdateExpense] = useState(false);
  const [reset, setReset] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [expenseEditData, setExpenseEditData] = useState(null);
  const [isResetEmailVerified, setIsResetEmailVerified] = useState(false);
  const [dailyExpense, setDailyExpense] = useState([]);
  const [dailyIncome, setDailyIncome] = useState([]);
  const [weeklyExpense, setWeeklyExpense] = useState([]);
  const [weeklyIncome, setWeeklyIncome] = useState([]);
  const [dailyCategoryExpense, setDailyCategoryExpense] = useState([]);
  const [dailyCategoryIncome, setDailyCategoryIncome] = useState([]);
  const [weeklyCategoryExpense, setWeeklyCategoryExpense] = useState([]);
  const [weeklyCategoryIncome, setWeeklyCategoryIncome] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const fetchExpenseData = async (week, month) => {
    try {
      const dailyUrl = `${backendURI}/api/expenses/dailyExpense?week=${week}&month=${month}`;
      const weeklyUrl = `${backendURI}/api/expenses/weeklyExpense?month=${month}`;
      const dailyRes = await axios.get(dailyUrl, {
        withCredentials: true,
      });
      const weeklyRes = await axios.get(weeklyUrl, {
        withCredentials: true,
      });
      if (dailyRes.data.success) {
        setDailyExpense(dailyRes.data.dailyExpenses);
      } else {
        toast.error(dailyRes.data.message, {
          autoClose: 2000,
        });
      }
      if (weeklyRes.data.success) {
        setWeeklyExpense(weeklyRes.data.weeklyExpenses);
      } else {
        toast.error(weeklyRes.data.message, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  const fetchIncomeData = async (week, month) => {
    try {
      const dailyUrl = `${backendURI}/api/incomes/dailyIncome?week=${week}&month=${month}`;
      const weeklyUrl = `${backendURI}/api/incomes/weeklyIncome?month=${month}`;
      const dailyRes = await axios.get(dailyUrl, {
        withCredentials: true,
      });
      const weeklyRes = await axios.get(weeklyUrl, {
        withCredentials: true,
      });
      if (dailyRes.data.success) {
        setDailyIncome(dailyRes.data.dailyIncomes);
      } else {
        toast.error(dailyRes.data.message, {
          autoClose: 2000,
        });
      }
      if (weeklyRes.data.success) {
        setWeeklyIncome(weeklyRes.data.weeklyIncomes);
      } else {
        toast.error(weeklyRes.data.message, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  const fetchCategoryExpenseData = async (week = null, month, category) => {
    try {
      if (week !== null) {
        const dailyUrl = `${backendURI}/api/expenses/dailyCategoryExpense?week=${week}&month=${month}&category=${category}`;
        const dailyRes = await axios.get(dailyUrl, {
          withCredentials: true,
        });
        if (dailyRes.data.success) {
          setDailyCategoryExpense(dailyRes.data.dailyCategoryExpenses);
        } else {
          console.log("Error from backend invoked");
          toast.error(dailyRes.data.message, {
            autoClose: 2000,
          });
        }
      } else {
        const weeklyUrl = `${backendURI}/api/expenses/weeklyCategoryExpense?month=${month}&category=${category}`;
        const weeklyRes = await axios.get(weeklyUrl, {
          withCredentials: true,
        });
        if (weeklyRes.data.success) {
          setWeeklyCategoryExpense(weeklyRes.data.weeklyCategoryExpenses);
        } else {
          toast.error(weeklyRes.data.message, {
            autoClose: 2000,
          });
        }
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  const fetchCategoryIncomeData = async (week = null, month, category) => {
    try {
      if (week !== null) {
        const dailyUrl = `${backendURI}/api/incomes/dailyCategoryIncome?week=${week}&month=${month}&category=${category}`;
        const dailyRes = await axios.get(dailyUrl, {
          withCredentials: true,
        });
        if (dailyRes.data.success) {
          setDailyCategoryIncome(dailyRes.data.dailyCategoryIncomes);
        } else {
          toast.error(dailyRes.data.message, {
            autoClose: 2000,
          });
        }
      } else {
        const weeklyUrl = `${backendURI}/api/incomes/weeklyCategoryIncome?month=${month}&category=${category}`;
        const weeklyRes = await axios.get(weeklyUrl, {
          withCredentials: true,
        });
        if (weeklyRes.data.success) {
          setWeeklyCategoryIncome(weeklyRes.data.weeklyCategoryIncomes);
        } else {
          toast.error(weeklyRes.data.message, {
            autoClose: 2000,
          });
        }
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  const fetchUser = async () => {
    try {
      const url = `${backendURI}/api/auth/user`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        toast.error("Failed to fetch user data.", { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  const fetchBudgetList = async () => {
    try {
      const response = await axios.get(`${backendURI}/api/incomes/getIncomes`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setBudgetList(response.data.incomes);
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  const fetchExpenseList = async () => {
    try {
      const response = await axios.get(
        `${backendURI}/api/expenses/getExpenses`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setExpenseList(response.data.expenses);
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");
      setIsRefreshing(true);
      if (token) {
        try {
          const response = await axios.post(
            `${backendURI}/api/auth/verify-token`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );

          if (response.data.success) {
            setLoggedIn(true);
          } else {
            localStorage.removeItem("authToken");
          }
        } catch (error) {
          localStorage.removeItem("authToken");
        }
        setIsRefreshing(false);
      }
    };

    verifyToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      fetchUser();
      fetchBudgetList();
      fetchExpenseList();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) fetchBudgetList();
  }, [updateBudget]);

  useEffect(() => {
    if (loggedIn) fetchExpenseList();
  }, [updateExpense]);

  return (
    <AppContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        navigate,
        backendURI,
        reset,
        setReset,
        isResetEmailVerified,
        setIsResetEmailVerified,
        isLogging,
        setIsLogging,
        otpSent,
        setOtpSent,
        budgetList,
        setBudgetList,
        updateBudget,
        setUpdateBudget,
        budgetExpenseList,
        setBudgetExpenseList,
        updateExpense,
        setUpdateExpense,
        popupData,
        setPopupData,
        expenseEditData,
        setExpenseEditData,
        expenseList,
        setExpenseList,
        user,
        dailyExpense,
        dailyIncome,
        weeklyExpense,
        weeklyIncome,
        fetchExpenseData,
        fetchIncomeData,
        dailyCategoryExpense,
        dailyCategoryIncome,
        weeklyCategoryExpense,
        weeklyCategoryIncome,
        fetchCategoryExpenseData,
        fetchCategoryIncomeData,
        isRefreshing,
        setIsRefreshing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
