import React, { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Picker from "emoji-picker-react";
import { AppContext } from "../utils/Context";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AddBudget = ({
  onClick,
  budget,
  isBudgetEditing,
  handleBudgetEditClick,
}) => {
  const [formData, setFormData] = useState({
    title: budget?.title || "",
    amount: budget?.amount || "",
    date: "",
    time: "",
    category: budget?.category || "",
    image:
      budget?.image ||
      "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f604.png",
  });

  const { backendURI, setUpdateBudget } = useContext(AppContext);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEmojiClick = (e) => {
    setFormData((prev) => ({ ...prev, image: e.imageUrl }));
    setPickerVisible(false);
  };

  const getFormattedDate = () => {
    const date = new Date();
    const formattedDate = String(date.getDate()).padStart(2, "0");
    const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const formattedYear = date.getFullYear().toString().slice(-2);
    const formattedDateString = `${formattedDate}-${formattedMonth}-${formattedYear}`;
    return formattedDateString;
  };

  const getFormattedTime = () => {
    const date = new Date();
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(date.getMinutes()).padStart(2, "0");
    const period = date.getHours() >= 12 ? "PM" : "AM";
    const formattedTimeString = `${formattedHours}:${formattedMinutes} ${period}`;

    return formattedTimeString;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedDate = getFormattedDate();
      const formattedTime = getFormattedTime();
      const dataToSubmit = {
        ...formData,
        date: formattedDate,
        time: formattedTime,
      };

      const url = isBudgetEditing
        ? `${backendURI}/api/incomes/editIncome/${budget._id}`
        : `${backendURI}/api/incomes/addIncome`;
      const response = await axios.post(url, dataToSubmit, {
        withCredentials: true,
      });
      const { success, message } = response.data;
      if (success) {
        setUpdateBudget((prev) => !prev);
        if (isBudgetEditing) {
          handleBudgetEditClick();
        } else {
          onClick();
        }
        toast.success(message, { autoClose: 2000 });
      } else {
        toast.error(message, { autoClose: 5000 });
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
    setLoading(false);
  };
  const popupVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.15, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.15, ease: "easeInOut" },
    },
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full md:p-0 p-4 rounded-md z-10 grid bg-[#00000060]">
      <motion.form
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onSubmit={handleSubmit}
        className="px-6 py-4 bg-white rounded-md place-self-center md:w-1/3 w-full"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl  text-black">
            {isBudgetEditing ? "Edit Budget" : "Add Budget"}
          </h2>
          <RxCross1
            className="cursor-pointer font-bold text-xl"
            onClick={isBudgetEditing ? handleBudgetEditClick : onClick}
          />
        </div>
        <span
          onClick={() => setPickerVisible((prev) => !prev)}
          className={`inline-block px-4 py-2 cursor-pointer rounded-md border-2 border-gray-500 text-xl`}
        >
          <img
            className="object-cover object-center h-8 w-8"
            src={formData.image}
            alt="emoji"
          />
        </span>
        <div
          className={`${
            pickerVisible ? "absolute" : "hidden"
          } top-50 left-10 md:left-1/2 transform z-20 h-[45%] w-[85%] md:w-[35%]`}
        >
          <RxCross1
            className="cursor-pointer font-bold text-lg absolute z-30 right-2 top-1"
            onClick={() => setPickerVisible((prev) => !prev)}
          />
          <Picker
            onEmojiClick={handleEmojiClick}
            height={"100%"}
            width={"100%"}
          />
        </div>
        <label
          htmlFor="title"
          className="relative my-4 block rounded-md border border-gray-500 outline-none shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            required
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="peer py-2 px-4 border-none text-gray-700 bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            placeholder="Budget Title"
          />
          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            Budget Title
          </span>
        </label>
        <label
          htmlFor="amount"
          className="relative my-4 block rounded-md border border-gray-500 outline-none shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            required
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="peer py-2 px-4 text-gray-700 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
            placeholder="Budget Amount"
          />
          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
            Budget Amount
          </span>
        </label>
        <div>
          <select
            required
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1.5 w-full bg-transparent rounded-md p-2 text-gray-700 border border-gray-500 sm:text-sm outline-none"
          >
            <option value="" className="text-gray-400">
              Select Budget Category
            </option>
            <option value="salary" className="bg-green-50">
              Salary
            </option>
            <option value="business" className="bg-green-50">
              Business/Entrepreneurship
            </option>
            <option value="investement" className="bg-yellow-50">
              Investement (Stock Market, Mutual Funds)
            </option>
            <option value="agriculture" className="bg-red-50">
              Agriculture
            </option>
            <option value="saving" className="bg-pink-50">
              Savings Returns
            </option>
            <option value="family" className="bg-cyan-50">
              Family Support
            </option>
            <option value="rent" className="bg-green-50">
              Rental Income
            </option>
            <option value="other" className="bg-slate-50">
              Other
            </option>
          </select>
        </div>
        <button className="mt-8 inline-flex items-center justify-center relative group overflow-hidden rounded bg-indigo-600 w-full py-2 text-white focus:outline-none">
          {loading ? (
            <TailSpin
              visible={true}
              height="20"
              width="20"
              color="#fff"
              ariaLabel="tail-spin-loading"
              radius="1"
            />
          ) : (
            <>
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                  className="size-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <span className="text-sm font-medium transition-all group-hover:me-5">
                {isBudgetEditing ? "Edit Budget" : "Add Budget"}
              </span>
            </>
          )}
        </button>
      </motion.form>
    </div>
  );
};

export default AddBudget;
