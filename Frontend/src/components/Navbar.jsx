import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../utils/Context";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import logo from "../assets/logo.svg";
import { IoIosArrowRoundForward } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const { backendURI, setLoggedIn, loggedIn, setIsLogging, navigate } =
    useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = () => {
    setIsLogging(true);
    navigate("/login");
  };

  return (
    <motion.div
      className="lg:px-4 px-2 flex justify-between items-center border-2 h-20 bg-[#fff]"
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => {
          loggedIn ? navigate("/dashboard") : navigate("/");
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
      >
        <motion.img
          src={logo}
          className="inline-block mr-2"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.7 }}
        />
        <span className="lg:text-3xl text-2xl text-[#4842d2] font-bold">
          XPENS
        </span>
      </motion.div>
      {!loggedIn ? (
        <motion.button
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="text-white flex items-center justify-center gap-1 lg:px-4  lg:py-2 p-2 rounded bg-[#4842d2] shadow focus:outline-none focus:ring active:bg-blue-900"
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
      ) : (
        <div className="profile-wrapper relative z-10">
          <motion.div whileTap={{ scale: 0.9 }}>
            <CgProfile
              className="text-4xl cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
          </motion.div>
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                onMouseLeave={() => setShowDropdown(false)}
                className="absolute w-fit bg-white right-[0%] top-[180%] px-2 py-4 border-2 rounded-md shadow-lg"
                initial={{ opacity: 0, x: "-100%", scale: 0 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: "-100%", scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  onClick={handleLogout}
                  className="group text-gray-600 hover:text-gray-500 px-4 py-2 cursor-pointer flex gap-20 justify-between items-center"
                >
                  <motion.span
                    className="group-hover:scale-105"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.1 }}
                  >
                    Logout
                  </motion.span>
                  <TbLogout className="text-md font-bold group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  to="/dashboard/profile"
                  className="group text-gray-600 hover:text-gray-500 px-4 py-2 cursor-pointer flex justify-between items-center"
                >
                  <motion.span
                    className="group-hover:scale-105"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.1 }}
                  >
                    Profile
                  </motion.span>
                  <FaUser className="text-md font-bold group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default Navbar;
