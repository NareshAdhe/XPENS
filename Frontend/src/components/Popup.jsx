import React, { useContext } from "react";
import { AppContext } from "../utils/Context";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

const Popup = ({
  incomeId,
  expenseId = "",
  popupTitle,
  handleBudgetDeleteClick,
}) => {
  const {
    backendURI,
    setUpdateBudget,
    setUpdateExpense,
    setPopupData,
    navigate,
  } = useContext(AppContext);
  const deletBudget = popupTitle === "Budget";

  const handleCancelClick = () => {
    if (deletBudget) {
      handleBudgetDeleteClick();
    } else {
      setPopupData(null);
    }
  };

  const handleExpenseDelete = async () => {
    try {
      const url = `${backendURI}/api/expenses/deleteBudgetExpense/${incomeId}/${expenseId}`;
      const response = await axios.delete(url, {
        withCredentials: true,
      });
      if (response.data.success) {
        setPopupData(null);
        setUpdateBudget((prev) => !prev);
        setUpdateExpense((prev) => !prev);
        toast.success(response.data.message, {
          autoClose: 2000,
        });
      } else {
        toast.error(response.data.message, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  const handleBudgetDelete = async () => {
    try {
      const url = `${backendURI}/api/incomes/deleteIncome/${incomeId}`;
      const response = await axios.delete(url, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUpdateBudget((prev) => !prev);
        setUpdateExpense((prev) => !prev);
        handleBudgetDelete;
        navigate("/dashboard/incomes");
        toast.success(response.data.message, {
          autoClose: 2000,
        });
      } else {
        toast.error(response.data.message, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    initial: { scale: 1 },
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full md:p-0 p-8 rounded-md z-10 bg-[#00000060] grid">
      <motion.div
        className="bg-white place-self-center p-4 w-full max-w-md rounded-lg shadow-md"
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="text-lg font-semibold mb-2 tracking-wide">
          Delete {popupTitle}
        </h2>
        <p className="text-sm leading-relaxed tracking-wide">
          Are you sure you want to delete this expense? This action cannot be
          undone, and the {popupTitle} record will be permanently removed from
          your account.
        </p>
        <div className="mt-8 flex justify-end gap-8">
          <motion.button
            onClick={handleCancelClick}
            className="px-4 py-2 bg-gray-200 border border-gray-700 rounded-md hover:bg-gray-300"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={deletBudget ? handleBudgetDelete : handleExpenseDelete}
            className="px-4 py-2 bg-red-200 border border-red-700 rounded-md hover:bg-red-300"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
          >
            Delete
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Popup;
