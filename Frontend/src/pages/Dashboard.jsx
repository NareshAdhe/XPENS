import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Chart from "../components/Chart";
import Pie from "../components/Pie";
import { AppContext } from "../utils/Context";
import BudgetItem from "../components/BudgetItem";

const Dashboard = () => {
  const { budgetList, user } = useContext(AppContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.4,
      },
    },
  };

  const chartVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut", delay: 0.6 },
    },
  };

  const pieVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeInOut", delay: 0.8 },
    },
  };

  const incomeVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        delay: 1.1,
        staggerChildren: 0.3,
      },
    },
  };

  const childrenVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="overflow-auto bg-white border-2 sm:border-4 border-[#4842d2] w-full px-3 py-5 sm:p-4 rounded-lg"
    >
      <h1 className="mb-8 text-xl md:text-3xl font-semibold">
        Hello {user.name}😊 Welcome To{" "}
        <span className="text-[#4842d2]">XPENS</span>
      </h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="overflow-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <motion.div
          variants={chartVariants}
          initial="hidden"
          animate="visible"
          className="border-2 border-gray-400 p-1 shadow-lg hover:shadow-xl rounded-lg"
        >
          <Chart />
        </motion.div>
        <motion.div
          variants={pieVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center border-2 border-gray-400 shadow-lg hover:shadow-xl bg-white p-1 rounded-lg"
        >
          <Pie />
        </motion.div>
        <motion.div
          variants={incomeVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5 shadow-lg hover:shadow-xl border-2 border-gray-400 rounded-lg px-4 py-3 md:col-span-2 lg:col-span-1"
        >
          <h2 className="text-2xl font-semibold capitalize">Recent Incomes</h2>
          {budgetList.length === 0 ? (
            <div>
              <h1 className="text-lg text-gray-500">No Incomes Recorded!</h1>
              <Link
                to={"/dashboard/incomes"}
                className="inline-block my-2 px-4 sm:px-2 py-2 bg-[#4842d2] text-white text-lg tracking-wide font-sans rounded-md hover:bg-blue-800"
              >
                Add Incomes
              </Link>
            </div>
          ) : (
            budgetList
              .slice(-3)
              .reverse()
              .map((budget, index) => (
                <motion.div
                  variants={childrenVariants}
                  initial="hidden"
                  animate="visible"
                  key={index}
                >
                  <BudgetItem budget={budget} />
                </motion.div>
              ))
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
