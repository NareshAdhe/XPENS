import React, { useContext, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../utils/Context";
import { motion } from "framer-motion";

const ChangePassword = () => {
  const [passwordUpdate, setPasswordUpdate] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const { backendURI } = useContext(AppContext);

  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPasswordVisible: false,
    newPasswordVisible: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };
  const handleChange = (e) => {
    setPasswordUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = async () => {
    const { oldPassword, newPassword } = passwordUpdate;

    if (!oldPassword || !newPassword) {
      toast.error("Please fill in both fields.", { autoClose: 2000 });
      return;
    }
    setIsLoading(true);
    try {
      const url = `${backendURI}/api/auth/updatePassword`;
      const response = await axios.post(
        url,
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      setIsLoading(false);
      if (response.data.success) {
        toast.success("Password updated successfully.", { autoClose: 2000 });
        setPasswordUpdate({ oldPassword: "", newPassword: "" });
      } else {
        toast.error(response.data.message, { autoClose: 2000 });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  const changePasswordVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut", delay: 0.4 },
    },
  };

  return (
    <motion.form
      variants={changePasswordVariants}
      initial="hidden"
      animate="visible"
      className="bg-white px-4 py-2 rounded-lg shadow-sm mt-8 border-2 border-gray-300"
    >
      <h2 className="text-lg xs:text-xl font-bold text-gray-800 mb-4">
        Change Password
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            required
            autoComplete="off"
            type={passwordVisibility.oldPasswordVisible ? "text" : "password"}
            placeholder="Old Password"
            name="oldPassword"
            className="text-md xs:text-xl text-gray-800 p-3 border-2 border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={passwordUpdate.oldPassword}
            onChange={handleChange}
          />
          <div
            className="absolute top-1/3 right-3 cursor-pointer"
            onClick={() => togglePasswordVisibility("oldPasswordVisible")}
          >
            {passwordVisibility.oldPasswordVisible ? (
              <GoEye />
            ) : (
              <GoEyeClosed />
            )}
          </div>
        </div>
        <div className="relative">
          <input
            required
            autoComplete="off"
            type={passwordVisibility.newPasswordVisible ? "text" : "password"}
            placeholder="New Password"
            name="newPassword"
            className="text-md xs:text-xl text-gray-800 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={passwordUpdate.newPassword}
            onChange={handleChange}
          />
          <div
            className="absolute top-1/3 right-3 cursor-pointer"
            onClick={() => togglePasswordVisibility("newPasswordVisible")}
          >
            {passwordVisibility.newPasswordVisible ? (
              <GoEye />
            ) : (
              <GoEyeClosed />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={handlePasswordChange}
        className="xs:w-48 w-24 flex justify-center items-center my-4 bg-[#4842d2] text-white py-2 px-4 rounded-md hover:bg-[#4842c2] transition-all"
      >
        {isLoading ? (
          <TailSpin
            visible={true}
            height="24"
            width="24"
            color="#fff"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        ) : (
          "Update"
        )}
      </button>
    </motion.form>
  );
};

export default ChangePassword;
