import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils/Context";
import { motion } from "framer-motion";
import ExpenseItem from "../components/ExpenseItem";

const getParsedDate = (inputDate) => {
  let [date, month, year] = inputDate.split("-").map(Number);
  year += 2000;
  return new Date(year, month - 1, date);
};

const getFormattedDate = (inputDate) => {
  const [year, month, date] = inputDate.split("-");
  const formattedDate = `${date}-${month}-${year.slice(-2)}`;
  return formattedDate;
};

const ExpenseList = ({ category, startDate, endDate }) => {
  const { expenseList } = useContext(AppContext);
  const [fileteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    const filterBudgets = () => {
      let filtered = expenseList;

      if (category) {
        filtered = filtered.filter((Expense) => Expense.category === category);
      }

      if (startDate) {
        let formattedStartDate = getFormattedDate(startDate);
        const newStartDate = getParsedDate(formattedStartDate);
        filtered = filtered.filter((Expense) => {
          const newExpenseDate = getParsedDate(Expense.date);
          return newExpenseDate >= newStartDate;
        });
      }

      if (endDate) {
        let formattedEndDate = getFormattedDate(endDate);
        const newEndDate = getParsedDate(formattedEndDate);
        filtered = filtered.filter((Expense) => {
          const newExpenseDate = getParsedDate(Expense.date);
          return newExpenseDate <= newEndDate;
        });
      }

      setFilteredExpenses(filtered);
    };

    filterBudgets();
  }, [category, startDate, endDate, expenseList]);

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut", delay: 0.5 },
    },
  };

  return (
    <div className="grid grid-cols-1 gap-5 my-10">
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="hidden xs:grid items-center grid-cols-[4fr,1fr,2fr] gap-6 p-4 text-base font-medium text-gray-800 bg-gray-300 border-2 rounded-t-lg"
      >
        <h1 className="justify-self-stretch text-left">Name</h1>
        <h1 className="justify-self-start text-center">Amount</h1>
        <h1 className="justify-self-end text-right">Action</h1>
      </motion.div>

      {fileteredExpenses?.length > 0 ? (
        fileteredExpenses.map((expense) => (
          <motion.div
            key={expense._id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <ExpenseItem expense={expense} budgetExpenseEditing={false} />
          </motion.div>
        ))
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center text-gray-500 text-lg"
        >
          No expenses recorded yet. Start adding your expenses!
        </motion.p>
      )}
    </div>
  );
};

export default ExpenseList;
