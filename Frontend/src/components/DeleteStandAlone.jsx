import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../utils/Context";
import { toast } from "react-toastify";
import axios from "axios";

const DeleteStandAlone = ({ expense, handleStandAloneDelete }) => {
  const { backendURI, setUpdateExpense } = useContext(AppContext);

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
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    initial: { scale: 1 },
  };

  const handleDeleteExpense = async () => {
    try {
      const url = `${backendURI}/api/expenses/deleteStandAlone/${expense._id}`;
      const response = await axios.delete(url, {
        withCredentials: true,
      });
      if (response.data.success) {
        handleStandAloneDelete(false);
        setUpdateExpense((prev) => !prev);
        toast.success(response.data.message, {
          autoClose: 2000,
        });
      } else {
        toast.error(response.data.message, {
          autoClose: 2000,
        });
        return;
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full md:p-0 p-4 rounded-md z-10 bg-[#00000060] grid">
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
          undone, and the Expense record will be permanently removed from your
          account.
        </p>
        <div className="mt-8 flex justify-end gap-8">
          <motion.button
            onClick={() => handleStandAloneDelete(false)}
            className="px-4 py-2 bg-gray-200 border border-gray-700 rounded-md hover:bg-gray-300"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={handleDeleteExpense}
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

export default DeleteStandAlone;
