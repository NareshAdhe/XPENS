import React, { useCallback, useContext } from "react";
import Box from "../components/Box";
import { AppContext } from "../utils/Context";
import { CgProfile } from "react-icons/cg";
import ChangePassword from "../components/ChangePassword";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Profile = () => {
  const {
    backendURI,
    updateBudget,
    updateExpense,
    user,
    budgetList,
    expenseList,
    setIsLogging,
    setLoggedIn,
    navigate,
  } = useContext(AppContext);

  const getValues = useCallback(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    budgetList.forEach((income) => {
      totalIncome += income.amount;
      totalExpense += income.spent;
    });
    let totalBalance = totalIncome - totalExpense;
    return { totalIncome, totalExpense, totalBalance };
  }, [updateBudget, updateExpense]);

  const getStandAloneExpense = useCallback(() => {
    let standAloneExpense = 0;
    expenseList.forEach((expense) => {
      if (!expense.incomeId) {
        standAloneExpense += expense.amount;
      }
    });
    return standAloneExpense;
  }, [updateExpense]);

  const handleLogout = async () => {
    try {
      const url = backendURI + "/api/auth/logout";
      const response = await axios.post(
        url,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setIsLogging(false);
        setLoggedIn(false);
        navigate("/");
        localStorage.removeItem("authToken");
        toast.success(response.data.message, {
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
  };
  const standAloneExpense = getStandAloneExpense();
  const { totalIncome, totalExpense, totalBalance } = getValues();
  const { name, email } = user;

  const profileVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const boxVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.1 } },
    initial: { scale: 1 },
  };

  return (
    <motion.div
      variants={profileVariants}
      initial="hidden"
      animate="visible"
      className="bg-white border-2 sm:border-4 border-[#4842d2] px-3 py-5 rounded-lg shadow-md w-full mx-auto overflow-x-hidden overflow-y-auto"
    >
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div
          variants={profileVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-sm border-2 border-gray-300"
        >
          <div className="flex flex-col items-center">
            <div className="p-4 bg-gray-200 rounded-full">
              <CgProfile className="text-5xl text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">{name}</h2>
            <p className="text-sm 2xs:text-lg text-gray-500">{email}</p>
          </div>
          <div className="mt-6">
            <motion.button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
            >
              Logout
            </motion.button>
          </div>
        </motion.div>

        <div className="items-stretch grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={boxVariants} initial="hidden" animate="visible">
            <Box
              bg="bg-gradient-to-r from-green-400 to-green-600"
              text="Total Income"
              amount={totalIncome}
            />
          </motion.div>
          <motion.div variants={boxVariants} initial="hidden" animate="visible">
            <Box
              bg="bg-gradient-to-r from-red-400 to-red-600"
              text="Income Expense"
              amount={totalExpense}
            />
          </motion.div>
          <motion.div variants={boxVariants} initial="hidden" animate="visible">
            <Box
              bg="bg-gradient-to-r from-blue-400 to-blue-600"
              text="Current Balance"
              amount={totalBalance}
            />
          </motion.div>
          <motion.div variants={boxVariants} initial="hidden" animate="visible">
            <Box
              bg="bg-gradient-to-r from-green-400 to-green-600"
              text="StandAlone Expense"
              amount={standAloneExpense}
            />
          </motion.div>
        </div>
      </div>

      <ChangePassword />
    </motion.div>
  );
};

export default Profile;
