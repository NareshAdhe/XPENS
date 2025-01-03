import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { TbPigMoney } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { delay, motion } from "framer-motion";

const Sidebar = () => {
  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <RxDashboard className="text-xl" />,
    },
    {
      to: "/dashboard/incomes",
      label: "Incomes",
      icon: <TbPigMoney className="text-xl" />,
    },
    {
      to: "/dashboard/expenses",
      label: "Expenses",
      icon: <RiMoneyRupeeCircleLine className="text-xl" />,
    },
    {
      to: "/dashboard/profile",
      label: "Profile",
      icon: <CgProfile className="text-xl" />,
    },
  ];

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: -200,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.3,
        delay: 0.2,
      },
    },
  };

  const childrenVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full px-2 sm:px-4 py-5 bg-white border-2 sm:border-4 border-[#4842d2] rounded-lg"
    >
      <ul className="flex flex-col gap-2 flex-1">
        {navItems.map((item, index) => (
          <motion.li key={index} variants={childrenVariants}>
            <NavLink
              to={item.to}
              end={index === 0}
              className={({ isActive }) =>
                `flex items-center justify-start gap-3 p-2 rounded transition-all hover:bg-[#e0deff] hover:text-[#4842d2] ${
                  isActive
                    ? "bg-[#e0deff] text-[#4842d2]"
                    : "bg-transparent text-black"
                }`
              }
            >
              {item.icon}
              <span className="hidden sm:inline-block rounded-lg px-4 py-2 text-xl font-medium">
                {item.label}
              </span>
            </NavLink>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
