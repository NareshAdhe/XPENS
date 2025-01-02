import React from "react";
import { motion } from "framer-motion";

const Filter = ({
  expenseCategory,
  expenseStartDate,
  expenseEndDate,
  budgetCategory,
  budgetStartDate,
  budgetEndDate,
  handleExpenseCategory,
  handleExpenseStartDate,
  handleExpenseEndDate,
  handleBudgetCategory,
  handleBudgetStartDate,
  handleBudgetEndDate,
  isExpenseFilter = false,
}) => {
  const handleCategory = (e) => {
    if (isExpenseFilter) {
      handleExpenseCategory(e.target.value);
    } else {
      handleBudgetCategory(e.target.value);
    }
  };
  const handleStartDate = (e) => {
    if (isExpenseFilter) {
      handleExpenseStartDate(e.target.value);
    } else {
      handleBudgetStartDate(e.target.value);
    }
  };
  const handleEndDate = (e) => {
    if (isExpenseFilter) {
      handleExpenseEndDate(e.target.value);
    } else {
      handleBudgetEndDate(e.target.value);
    }
  };

  const selectOptions = isExpenseFilter ? (
    <>
      <option value="" className="text-gray-400">
        All
      </option>
      <option value="housing" className="bg-red-50">
        Housing (Rent/Mortgage)
      </option>
      <option value="utilities" className="bg-blue-50">
        Utilities (Electricity, Water, Internet)
      </option>
      <option value="groceries" className="bg-green-50">
        Groceries
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
    </>
  ) : (
    <>
      <option value="" className="text-gray-400">
        All
      </option>
      <option value="salary" className="bg-green-50">
        Salary
      </option>
      <option value="business" className="bg-green-50">
        Business/Entrepreneurship
      </option>
      <option value="freelancing" className="bg-blue-50">
        Freelancing (Gig Economy)
      </option>
      <option value="investement" className="bg-yellow-50">
        Investement (Stock Market, Mutual Funds)
      </option>
      <option value="agriculture" className="bg-red-50">
        Agriculture
      </option>
      <option value="content" className="bg-red-50">
        Online Platforms (Youtube)
      </option>
      <option value="scheme" className="bg-purple-50">
        Government Schemes
      </option>
      <option value="interest" className="bg-indigo-50">
        Interest Income
      </option>
      <option value="saving" className="bg-pink-50">
        Savings Returns
      </option>
      <option value="family" className="bg-cyan-50">
        Family Support
      </option>
      <option value="rent" className="bg-green-50">
        Rental Income
      </option>
    </>
  );

  const filterVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeInOut", delay: 0.3 },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={filterVariants}
      initial="hidden"
      animate="visible"
      className="my-4 flex flex-col md:flex-row md:items-center justify-between mb-4"
    >
      <div className="flex flex-col md:w-full lg:items-center lg:justify-between lg:flex-row gap-2 md:gap-4">
        <div className="flex flex-col gap-2 my-2 lg:items-center lg:flex-row">
          <label htmlFor="category" className="whitespace-nowrap">
            Filter by Category:
          </label>
          <select
            required
            name="category"
            id="category"
            value={isExpenseFilter ? expenseCategory : budgetCategory}
            onChange={handleCategory}
            className="w-full sm:w-auto rounded-md py-2 cursor-pointer text-gray-700 border border-gray-500 sm:text-sm outline-none text-center"
          >
            {selectOptions}
          </select>
        </div>

        <div className="flex flex-col md:gap-6 md:flex-row md:justify-between gap-2">
          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:items-start lg:items-center lg:flex-row gap-2 my-2 md:my-0 md:gap-2"
          >
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={isExpenseFilter ? expenseStartDate : budgetStartDate}
              onChange={handleStartDate}
              className="select-none cursor-pointer text-center outline-none border border-gray-600 rounded-md py-1 px-2"
            />
          </motion.div>
          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:items-start lg:flex-row lg:items-center gap-2 my-2 md:my-0 md:gap-2"
          >
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={isExpenseFilter ? expenseEndDate : budgetEndDate}
              onChange={handleEndDate}
              className="select-none cursor-pointer text-center outline-none border border-gray-600 rounded-md py-1 px-2"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Filter;
