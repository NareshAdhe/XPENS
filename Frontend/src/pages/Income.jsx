import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CreateBudget from "../components/CreateBudget";
import AddBudget from "./AddBudget";
import BudgetList from "../components/BudgetList";
import Filter from "../components/Filter";

const Income = () => {
  const [showAddBudget, setShowAddBudget] = useState(false);
  const handleClick = () => {
    setShowAddBudget(!showAddBudget);
  };

  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleBudgetCategory = (val) => {
    setCategory(val);
  };

  const handleBudgetStartDate = (val) => {
    setStartDate(val);
  };

  const handleBudgetEndDate = (val) => {
    setEndDate(val);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`relative ${
        showAddBudget ? "overflow-hidden" : "overflow-auto"
      } bg-white border-2 sm:border-4 border-[#4842d2] w-full px-3 py-5 rounded-lg`}
    >
      <h1 className="text-3xl font-semibold mb-4 sm:mb-0">My Incomes</h1>
      <Filter
        budgetCategory={category}
        budgetStartDate={startDate}
        budgetEndDate={endDate}
        handleBudgetCategory={handleBudgetCategory}
        handleBudgetStartDate={handleBudgetStartDate}
        handleBudgetEndDate={handleBudgetEndDate}
      />
      <motion.div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 items-stretch">
        <CreateBudget onClick={handleClick} />
        <AnimatePresence>
          {showAddBudget && <AddBudget onClick={handleClick} />}
        </AnimatePresence>
        <BudgetList
          category={category}
          startDate={startDate}
          endDate={endDate}
        />
      </motion.div>
    </motion.div>
  );
};

export default Income;
