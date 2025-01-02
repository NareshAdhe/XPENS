import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../utils/Context";
import { toast } from "react-toastify";
import BudgetItem from "../components/BudgetItem";
import axios from "axios";
import AddExpense from "../components/AddExpense";
import AddBudget from "../pages/AddBudget";
import BudgetExpenses from "../components/BudgetExpenses";
import { ShimmerContentBlock } from "react-shimmer-effects";
import Popup from "../components/Popup";
import ExpneseEdit from "../components/ExpneseEdit";
import { IoArrowBackSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const BudgetExpense = () => {
  const { id } = useParams();
  const [budget, setBudget] = useState({});
  const [isBudgetEditing, setIsBudgetEditing] = useState(false);
  const [isBudgetDeleting, setIsBudgetDeleting] = useState(false);
  const {
    backendURI,
    updateBudget,
    popupData,
    setPopupData,
    setExpenseEditData,
    expenseEditData,
  } = useContext(AppContext);

  const getBudget = async () => {
    try {
      const url = backendURI + `/api/incomes/getIncome/${id}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      if (response.data.success) {
        setBudget(response.data.income);
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    getBudget();
  }, [updateBudget]);

  useEffect(() => {
    setPopupData(null);
    setExpenseEditData(null);
  }, []);

  const handleBudgetEditClick = () => {
    setIsBudgetEditing((prev) => !prev);
  };

  const handleBudgetDeleteClick = () => {
    setIsBudgetDeleting((prev) => !prev);
  };

  return (
    <div
      className={`w-full overflow-auto overflow-x-hidden relative bg-white border-2 sm:border-4 border-[#4842d2] p-3 sm:p-5 rounded-lg`}
    >
      <div className="mb-12 md:flex-row  flex items-start gap-8 flex-col md:items-center md:justify-between py-4">
        <div className="flex items-center gap-2 bg-red">
          <Link to={"/dashboard/incomes"}>
            <IoArrowBackSharp size={30} />
          </Link>
          <h1 className="text-2xl xs:text-3xl font-semibold">My Expense</h1>
        </div>
        <div className="flex items-center gap-2 justify-self-end">
          <button
            onClick={() => setIsBudgetEditing((prev) => !prev)}
            title="Edit"
            className="py-2 px-4 flex gap-2 items-center justify-center rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition duration-200"
          >
            <FiEdit size={20} />
            <p>Edit</p>
          </button>
          <button
            onClick={() => setIsBudgetDeleting((prev) => !prev)}
            title="Delete"
            className="py-2 px-4 flex gap-2 items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition duration-200"
          >
            <RiDeleteBin6Line size={20} />
            <p>Delete</p>
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between gap-8 my-10">
        <div className="w-full md:w-1/2 rounded-lg">
          <BudgetItem budget={budget} />
        </div>
        <div className="w-full md:w-1/2 rounded-lg">
          <AddExpense id={budget._id} expenseHeader="Add Expense" />
        </div>
      </div>

      {popupData && id && (
        <Popup
          incomeId={id}
          expenseId={popupData.expenseId}
          popupTitle="Expense"
        />
      )}
      {expenseEditData && id && <ExpneseEdit />}
      {isBudgetEditing && id && (
        <AddBudget
          budget={budget}
          isBudgetEditing={isBudgetEditing}
          handleBudgetEditClick={handleBudgetEditClick}
        />
      )}
      {isBudgetDeleting && id && (
        <Popup
          popupTitle="Budget"
          incomeId={id}
          handleBudgetDeleteClick={handleBudgetDeleteClick}
        />
      )}
      {budget._id ? (
        <BudgetExpenses incomeId={budget._id} />
      ) : (
        <div className="w-full">
          <ShimmerContentBlock title text cta thumbnailWidth={400} />
        </div>
      )}
    </div>
  );
};

export default BudgetExpense;
