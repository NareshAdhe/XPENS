import React, { useContext, useState } from "react";
import { AppContext } from "../utils/Context";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import { TailSpin } from "react-loader-spinner";

const DeleteExpense = ({ expenseId, toggleDeleteExpense }) => {
  const { backendURI, setUpdateExpense, setUpdateBudget } =
    useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    toggleDeleteExpense();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const url = `${backendURI}/api/expenses/deleteExpense/${expenseId}`;
      const response = await axios.delete(url, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUpdateExpense((prev) => !prev);
        setUpdateBudget((prev) => !prev);
        toggleDeleteExpense();
        return toast.success(response.data.message, {
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
    setLoading(false);
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

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.1 } },
    initial: { scale: 1 },
  };

  return (
    <div
      variants={popupVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed top-0 left-0 w-full h-full z-10 bg-[#00000040] grid p-8"
    >
      <motion.div
        className="bg-white place-self-center p-4 w-full max-w-md rounded-lg shadow-md"
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="text-lg font-semibold mb-2 tracking-wide">
          Delete Expense
        </h2>
        <p className="text-sm leading-relaxed tracking-wide">
          Are you sure you want to delete this expense? This action cannot be
          undone, and the expense record will be permanently removed from your
          account.
        </p>
        <div className="mt-8 flex justify-end gap-4">
          <motion.button
            onClick={handleCancel}
            className="w-20 py-2 bg-gray-200 border border-gray-700 rounded-md hover:bg-gray-300"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={handleDelete}
            className="w-20 flex items-center justify-center py-2 bg-red-200 border border-red-700 rounded-md hover:bg-red-300"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
          >
            {loading ? (
              <TailSpin
                visible={true}
                height="24"
                width="24"
                color="#000"
                ariaLabel="tail-spin-loading"
                radius="1"
              />
            ) : (
              "Delete"
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteExpense;
