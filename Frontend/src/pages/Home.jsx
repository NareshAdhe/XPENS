import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../utils/Context";
import dashboardImage from "../assets/dashboard.png";
import { motion } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";

const Home = () => {
  const { navigate, setIsLogging } = useContext(AppContext);

  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = () => {
    setIsLogging(true);
    navigate("/login");
  };

  const parentVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  const childVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  return (
    <motion.section
      initial="initial"
      animate="animate"
      exit="exit"
      variants={parentVariants}
      className="flex flex-col items-center lg:min-h-screen h-[calc(100% - 900px)] p-2"
    >
      <div className="lg:w-[80vw] w-full lg:px-4 lg:py-32 py-16 lg:flex lg:items-center">
        <motion.div
          variants={childVariants}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h1
            variants={childVariants}
            className="text-3xl font-extrabold text-black sm:text-5xl mb-4"
          >
            Manage Your Expense. <br />
            <strong className="font-extrabold text-[#4842d2] sm:block">
              {" "}
              Control Your Money{" "}
            </strong>
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="mt-4 sm:text-xl/relaxed"
          >
            Start creating your budget and save ton of money
          </motion.p>

          <motion.div
            variants={childVariants}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <motion.button
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              className="text-white flex items-center justify-center gap-1 px-4 py-2 rounded bg-[#4842d2] shadow focus:outline-none focus:ring active:bg-blue-900"
            >
              Get Started
              <motion.div
                animate={{ x: isHovered ? 10 : 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 10,
                  velocity: 300,
                  duration: 0.5,
                }}
                className="inline-block text-3xl"
              >
                <IoIosArrowRoundForward />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.img
        src={dashboardImage}
        variants={childVariants}
        className="lg:w-[80vw] w-full bg-blue-400 border-5 p-[1vw] mb-10 rounded-md"
      />
    </motion.section>
  );
};

export default Home;
