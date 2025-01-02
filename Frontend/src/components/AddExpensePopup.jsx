import React, { useContext } from "react";
import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { AppContext } from "../utils/Context";

const AddExpensePopup = ({ handleShowPopup, handleShowAddExpense }) => {
  const { navigate } = useContext(AppContext);

  const handleAddExpense = () => {
    handleShowPopup(false);
    handleShowAddExpense(true);
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
    initial: { scale: 1 },
  };

  return (
    <motion.div className="fixed top-0 left-0 w-full h-full md:p-0 p-8 rounded-md z-10 bg-[#00000060] grid">
      <motion.div
        exit="exit"
        className="relative bg-white place-self-center p-4 w-full max-w-md rounded-lg shadow-md"
        variants={popupVariants}
        initial="hidden"
        animate="visible"
      >
        <RxCross1
          className="right-4 top-4 absolute cursor-pointer font-bold text-xl"
          onClick={() => handleShowPopup(false)}
        />
        <h2 className="text-lg font-semibold mb-2 tracking-wide">
          Select Option
        </h2>
        <p className="text-sm leading-relaxed tracking-wide">
          You have two options either you can add an expense which will not be
          included in any income or you can make an expense which will be
          included inside one of the incomes.
        </p>
        <div className="mt-8 flex items-end justify-end gap-8">
          <motion.button
            onClick={() => {
              handleShowPopup(false);
              navigate("/dashboard/incomes");
            }}
            className="px-4 py-2 bg-blue-600 border border-blue-950 rounded-md text-white hover:bg-blue-700"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
          >
            Income
          </motion.button>
          <motion.button
            onClick={handleAddExpense}
            className="px-4 py-2 bg-gray-200 border border-gray-700 hover:bg-gray-300 rounded-md"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
          >
            No Income
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddExpensePopup;
