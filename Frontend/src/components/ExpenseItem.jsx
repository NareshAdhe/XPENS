import React, { useContext, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { AppContext } from "../utils/Context";
import DeleteExpense from "../components/DeleteExpense";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import EditStandAlone from "../components/EditStandAlone";
import DeleteStandAlone from "../components/DeleteStandAlone";

const ExpenseItem = ({ expense, incomeId, budgetExpenseEditing = true }) => {
  const { setExpenseEditData, setPopupData, navigate } = useContext(AppContext);
  const [showDeleteExpense, setShowDeleteExpense] = useState(false);
  const [standAloneEdit, setStandAloneEdit] = useState(false);
  const [standAloneDelete, setStandAloneDelete] = useState(false);

  const handleStandAloneEdit = (val) => {
    setStandAloneEdit(val);
  };

  const handleStandAloneDelete = (val) => {
    setStandAloneDelete(val);
  };

  const toggleDeleteExpense = () => {
    setShowDeleteExpense(!showDeleteExpense);
  };

  const handleDelete = () => {
    if (!expense.incomeId) {
      handleStandAloneDelete(true);
    } else if (budgetExpenseEditing) {
      setPopupData({ incomeId, expenseId: expense._id });
    } else {
      toggleDeleteExpense();
    }
  };

  const handleEditClick = () => {
    if (!expense.incomeId) {
      handleStandAloneEdit(true);
    } else if (budgetExpenseEditing) {
      setExpenseEditData({
        expenseId: expense._id,
        name: expense.name,
        amount: expense.amount,
        category: expense.category,
        incomeId,
      });
    } else {
      toast.success("You can edit your expense here!!", {
        autoClose: 2000,
      });
      navigate(`/dashboard/expense/${expense.incomeId}`);
    }
  };

  return (
    <div className="relative w-full grid items-center xs:grid-cols-[4fr,1fr,2fr] gap-6 p-4 bg-white border-2 shadow-md rounded-lg hover:shadow-lg transition-all duration-200">
      <AnimatePresence>
        {standAloneDelete && expense && (
          <DeleteStandAlone
            expense={expense}
            handleStandAloneDelete={handleStandAloneDelete}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {standAloneEdit && (
          <EditStandAlone
            expense={expense}
            handleStandAloneEdit={handleStandAloneEdit}
          />
        )}
      </AnimatePresence>
      {!expense.incomeId && (
        <p className="absolute top-6 left-1 w-2 h-2 rounded-full bg-red-600"></p>
      )}
      <div className="flex flex-col sm:justify-self-stretch">
        <h2 className="text-base sm:text-lg font-medium text-gray-800">
          {expense.name} |{" "}
          <span className="text-gray-500 text-sm font-normal">
            {expense.category}
          </span>
        </h2>
        <p className="text-sm text-gray-500">
          {expense.date} | {expense.time}
        </p>
      </div>
      <AnimatePresence>
        {showDeleteExpense && (
          <DeleteExpense
            expenseId={expense._id}
            toggleDeleteExpense={toggleDeleteExpense}
          />
        )}
      </AnimatePresence>
      <p className="text-base sm:text-lg font-semibold text-red-600 justify-self-start">
        ₹{expense.amount.toLocaleString()}
      </p>
      <div className="flex gap-2 items-center justify-self-start xs:justify-self-end">
        <button
          onClick={handleDelete}
          title="Delete"
          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition duration-200"
        >
          <RiDeleteBin6Line size={20} />
        </button>
        <button
          onClick={handleEditClick}
          title="Edit"
          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition duration-200"
        >
          <FiEdit size={20} />
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
