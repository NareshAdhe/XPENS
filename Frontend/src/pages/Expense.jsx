import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Filter from "../components/Filter";
import ExpenseList from "../components/ExpenseList";
import AddExpensePopup from "../components/AddExpensePopup";
import AddExpense from "../components/AddExpense";

const Expense = () => {
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showExpensePopup, setShowExpensePopup] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const handleExpenseCategory = (val) => {
    setCategory(val);
  };

  const handleExpenseStartDate = (val) => {
    setStartDate(val);
  };

  const handleExpenseEndDate = (val) => {
    setEndDate(val);
  };

  const handleShowPopup = (val) => {
    setShowExpensePopup(val);
  };

  const handleShowAddExpense = (val) => {
    setShowAddExpense(val);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const filterVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeInOut", delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white border-2 sm:border-4 border-[#4842d2] w-full px-3 py-5 rounded-lg overflow-auto"
    >
      <AnimatePresence>
        {showAddExpense && (
          <div className="fixed top-0 left-0 w-full h-full md:p-0 p-4 rounded-md z-10 bg-[#00000060] grid">
            <AddExpense
              expenseHeader="Add Expense"
              handleShowAddExpense={handleShowAddExpense}
              noIncome={true}
              showCross={true}
              styles="place-self-center w-full md:w-1/3"
            />
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showExpensePopup && (
          <AddExpensePopup
            handleShowPopup={handleShowPopup}
            handleShowAddExpense={handleShowAddExpense}
          />
        )}
      </AnimatePresence>
      <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">My Expenses</h1>
        <motion.div
          variants={filterVariants}
          initial="hidden"
          animate="visible"
        >
          <Link
            onClick={() => handleShowPopup(true)}
            className="px-4 py-2 bg-[#4842d2] text-white text-lg tracking-wide font-sans rounded-md hover:bg-blue-800"
          >
            Add Expenses
          </Link>
        </motion.div>
      </div>
      <Filter
        isExpenseFilter={true}
        expenseCategory={category}
        expenseStartDate={startDate}
        expenseEndDate={endDate}
        handleExpenseCategory={handleExpenseCategory}
        handleExpenseStartDate={handleExpenseStartDate}
        handleExpenseEndDate={handleExpenseEndDate}
      />
      <ExpenseList
        category={category}
        startDate={startDate}
        endDate={endDate}
      />
    </motion.div>
  );
};

export default Expense;
