import React, { useContext, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../utils/Context";
import axios from "axios";

const BudgetExpenses = ({ incomeId }) => {
  const { backendURI, setBudgetExpenseList, budgetExpenseList, updateExpense } =
    useContext(AppContext);

  useEffect(() => {
    const fetchBudgetExpenseList = async () => {
      try {
        const response = await axios.get(
          `${backendURI}/api/expenses/getBudgetExpenses/${incomeId}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setBudgetExpenseList(response.data.expenses);
        }
      } catch (error) {
        console.error("Error fetching incomes:", error);
      }
    };
    fetchBudgetExpenseList();
  }, [updateExpense]);

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md mt-4 border border-gray-400">
      <h2 className="text-2xl font-semibold text-gray-800">Latest Expenses</h2>
      <div className="grid grid-cols-1 gap-5 my-10">
        <div className="hidden xs:grid items-center grid-cols-[4fr,1fr,2fr] gap-6 p-4 text-base font-medium text-gray-800 bg-gray-300 border-2 rounded-t-lg">
          <h1 className="justify-self-stretch text-left">Name</h1>
          <h1 className="justify-self-start text-center">Amount</h1>
          <h1 className="justify-self-end text-right">Action</h1>
        </div>
        {budgetExpenseList?.length > 0 ? (
          budgetExpenseList.map((expense, index) => (
            <ExpenseItem
              expense={expense}
              key={expense._id}
              incomeId={incomeId}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No expenses recorded yet!</p>
        )}
      </div>
    </div>
  );
};

export default BudgetExpenses;
