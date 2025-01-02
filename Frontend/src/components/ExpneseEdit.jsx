import React, { useContext } from "react";
import AddExpense from "../components/AddExpense";
import { AppContext } from "../utils/Context";

const ExpneseEdit = () => {
  const { expenseEditData } = useContext(AppContext);

  return (
    <div className="fixed top-0 left-0 w-full h-full md:p-0 p-4 rounded-md z-10 bg-[#00000060] grid">
      <AddExpense
        expenseHeader="Edit Expense"
        styles="place-self-center w-full md:w-1/3"
        showCross={true}
        expense={expenseEditData}
      />
    </div>
  );
};

export default ExpneseEdit;
