import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../utils/Context";
import { TailSpin } from "react-loader-spinner";
import { RxCross1 } from "react-icons/rx";
import { motion } from "framer-motion";

const AddExpense = ({
  id = "",
  expenseHeader,
  styles = "",
  showCross = false,
  expense = {},
  handleShowAddExpense,
  noIncome = false,
}) => {
  const [formData, setFormData] = useState({
    name: expense?.name || "",
    date: "",
    time: "",
    amount: expense?.amount || "",
    category: expense?.category || "",
  });

  const [loading, setLoading] = useState(false);
  const {
    backendURI,
    setUpdateBudget,
    setUpdateExpense,
    expenseEditData,
    setExpenseEditData,
  } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getFormattedDate = () => {
    const date = new Date();
    const formattedDate = String(date.getDate()).padStart(2, "0");
    const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const formattedYear = date.getFullYear().toString().slice(-2);
    const formattedDateString = `${formattedDate}-${formattedMonth}-${formattedYear}`;
    return formattedDateString;
  };

  const getFormattedTime = () => {
    const date = new Date();
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(date.getMinutes()).padStart(2, "0");
    const period = date.getHours() >= 12 ? "PM" : "AM";
    const formattedTimeString = `${formattedHours}:${formattedMinutes} ${period}`;

    return formattedTimeString;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const expenseId = expenseEditData?.expenseId || "";
      const incomeId = expenseEditData?.incomeId || id;
      const isEditing = showCross && !noIncome;
      const url = isEditing
        ? `${backendURI}/api/expenses/editExpense/${expenseId}`
        : `${backendURI}/api/expenses/addExpense`;

      const dataToSubmit = {
        ...formData,
        date: getFormattedDate(),
        time: getFormattedTime(),
      };

      if (!noIncome || isEditing) {
        dataToSubmit.incomeId = incomeId;
      } else {
        dataToSubmit.noIncome = true;
      }

      const response = await axios.post(url, dataToSubmit, {
        withCredentials: true,
      });

      setLoading(false);
      const { success, message } = response.data;

      if (success) {
        setUpdateBudget((prev) => !prev);
        setUpdateExpense((prev) => !prev);
        if (isEditing) {
          setExpenseEditData(null);
        } else if (noIncome) {
          handleShowAddExpense(false);
        } else {
          setFormData({
            name: expense?.name || "",
            date: "",
            time: "",
            amount: expense?.amount || "",
            category: expense?.category || "",
          });
        }

        toast.success(message, { autoClose: 2000 });
      } else {
        toast.error(message, { autoClose: 2000 });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  const handleCrossClick = () => {
    if (noIncome) {
      handleShowAddExpense(false);
    } else {
      setExpenseEditData(null);
    }
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.15, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.15, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={popupVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`${styles} bg-gray-200 shadow-md rounded-md p-4 border border-gray-400`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{expenseHeader}</h2>
        {showCross && (
          <RxCross1
            className="cursor-pointer font-bold text-xl"
            onClick={handleCrossClick}
          />
        )}
      </div>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <label
            htmlFor="name"
            className="relative mb-4 mt-2 block rounded-md border border-gray-500 outline-none shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              required
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="peer py-2 px-4 border-none text-gray-700 bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
              placeholder="Expense Name"
            />
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              Expense Name
            </span>
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <label
            htmlFor="amount"
            className="relative mb-4 mt-2 block rounded-md border border-gray-500 outline-none shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              required
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="peer py-2 px-4 border-none text-gray-700 bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
              placeholder="Expense Amount"
            />
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-200 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              Expense Amount
            </span>
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            required
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="cursor-pointer mt-1.5 w-full rounded-md py-2 px-4 text-gray-700 border bg-transparent border-gray-500 sm:text-sm outline-none"
          >
            <option value="" className="text-gray-400">
              Select Expense Category
            </option>
            <option value="housing" className="bg-red-50">
              Housing (Rent/Mortgage)
            </option>
            <option value="utilities" className="bg-blue-50">
              Utilities (Electricity, Water, Internet)
            </option>
            <option value="groceries" className="bg-green-50">
              Groceries (Food,Shopping,Festivals,Daily Needs)
            </option>
            <option value="transportation" className="bg-yellow-50">
              Transportation (Fuel, Public Transit)
            </option>
            <option value="healthcare" className="bg-purple-50">
              Healthcare (Insurance, Medical Expenses)
            </option>
            <option value="education" className="bg-indigo-50">
              Education (Tuition, Books)
            </option>
            <option value="entertainment" className="bg-pink-50">
              Entertainment (Movies, Subscriptions)
            </option>
            <option value="debt" className="bg-red-50">
              Debt Repayment (Loans, Credit Cards)
            </option>
            <option value="savings" className="bg-green-50">
              Savings/Investments
            </option>
            <option value="other" className="bg-gray-50">
              Other
            </option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 flex items-center justify-center text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none"
        >
          {loading ? (
            <TailSpin
              visible={true}
              height="24"
              width="24"
              color="#fff"
              ariaLabel="tail-spin-loading"
              radius="1"
            />
          ) : (
            expenseHeader
          )}
        </button>
      </motion.form>
    </motion.div>
  );
};

export default AddExpense;
