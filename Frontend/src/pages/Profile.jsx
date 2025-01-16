import React, { useCallback, useContext, useState } from "react";
import Box from "../components/Box";
import { AppContext } from "../utils/Context";
import { CgProfile } from "react-icons/cg";
import ChangePassword from "../components/ChangePassword";
import axios from "axios";
import { toast } from "react-toastify";
import { delay, motion } from "framer-motion";
import { TbPigMoney } from "react-icons/tb";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { CiMoneyBill } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";

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

  const [loading, setLoading] = useState(false);

  const getValues = useCallback(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    budgetList.forEach((income) => {
      totalIncome += income.amount;
      totalExpense += income.spent;
    });
    let totalBalance = totalIncome - totalExpense;
    totalBalance = Math.round(totalBalance * 100) / 100;
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
    setLoading(true);
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
    setLoading(false);
  };
  const standAloneExpense = getStandAloneExpense();
  const { totalIncome, totalExpense, totalBalance } = getValues();
  const { name, email } = user;

  const profileVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut", delay: 0.3 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const boxVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut", delay: 0.3 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.1 } },
    initial: { scale: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
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
          className="flex flex-col justify-between bg-white p-4 rounded-lg shadow-sm border-2 border-gray-300"
        >
          <div className="flex flex-col items-center">
            <div className="p-4 bg-gray-200 rounded-full">
              <CgProfile className="text-5xl text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">{name}</h2>
            <p className="text-[13px] 2xs:text-lg text-gray-500">{email}</p>
          </div>
          <div className="mt-6 w-full">
            <motion.button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
            >
              {loading ? (
                <TailSpin
                  visible={true}
                  height="24"
                  width="24"
                  color="#fff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                />
              ) : (
                "Logout"
              )}
            </motion.button>
          </div>
        </motion.div>

        <div className="items-stretch grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={boxVariants} initial="hidden" animate="visible">
            <Box
              bg="bg-gradient-to-r from-green-400 to-green-600"
              text="Total Income"
              amount={totalIncome}
              icon={<TbPigMoney className="text-2xl text-green-600" />}
            />
          </motion.div>
          <motion.div variants={boxVariants} initial="hidden" animate="visible">
            <Box
              bg="bg-gradient-to-r from-red-400 to-red-600"
              text="Income Expense"
              amount={totalExpense}
              icon={
                <RiMoneyRupeeCircleLine className="text-2xl text-red-600" />
              }
            />
          </motion.div>
          <motion.div variants={boxVariants} initial="hidden" animate="visible">
            <Box
              bg="bg-gradient-to-r from-blue-400 to-blue-600"
              text="Current Balance"
              amount={totalBalance}
              icon={
                <MdOutlineAccountBalanceWallet className="text-2xl text-blue-600" />
              }
            />
          </motion.div>
          <motion.div variants={boxVariants} initial="hidden" animate="visible">
            <Box
              bg="bg-[#4842d2]"
              text="StandAlone Expense"
              amount={standAloneExpense}
              icon={<CiMoneyBill className="text-2xl text-[#4842d2]" />}
            />
          </motion.div>
        </div>
      </div>

      <ChangePassword />
    </motion.div>
  );
};

export default Profile;
