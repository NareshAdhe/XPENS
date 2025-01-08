import React, { useState, useEffect, useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { AppContext } from "../utils/Context";
import { Audio } from "react-loader-spinner";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const Pie = () => {
  const {
    dailyCategoryIncome,
    dailyCategoryExpense,
    weeklyCategoryExpense,
    weeklyCategoryIncome,
    updateExpense,
    updateIncome,
    fetchCategoryExpenseData,
    fetchCategoryIncomeData,
  } = useContext(AppContext);

  const calculateMonthFirstDay = (givenMonth) => {
    const date = new Date();
    const firstDate = new Date(date.getFullYear(), givenMonth, 1);
    return firstDate.getDay();
  };

  const date = new Date();
  const currentMonthFirstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let weekIndex = Math.floor((date.getDate() - 1) / 7);
  weekIndex = Math.min(weekIndex, 3);
  let currentMonth = date.getMonth();
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(
    currentMonthFirstDay.getDay()
  );
  const [incomeCategory, setIncomeCategory] = useState("salary");
  const [expenseCategory, setExpenseCategory] = useState("housing");
  const [time, setTime] = useState("daily");
  const [type, setType] = useState("expense");
  const [week, setWeek] = useState(weekIndex);
  const [month, setMonth] = useState(currentMonth);
  const [dailyMonth, setDailyMonth] = useState(currentMonth);
  const [data, setData] = useState(dailyCategoryExpense);
  const [loading, setLoading] = useState(false);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [labels, setLabels] = useState([
    weekDays[firstDayOfMonth],
    weekDays[(firstDayOfMonth + 1) % 7],
    weekDays[(firstDayOfMonth + 2) % 7],
    weekDays[(firstDayOfMonth + 3) % 7],
    weekDays[(firstDayOfMonth + 4) % 7],
    weekDays[(firstDayOfMonth + 5) % 7],
    weekDays[(firstDayOfMonth + 6) % 7],
  ]);

  useEffect(() => {
    if (time === "daily")
      setFirstDayOfMonth(calculateMonthFirstDay(dailyMonth));
    else setFirstDayOfMonth(calculateMonthFirstDay(month));
  }, [month, dailyMonth]);

  const dailyBackgroundColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(210, 80, 255, 0.2)",
    "rgba(210, 255, 80, 0.2)",
    "rgba(80, 210, 255, 0.2)",
    "rgba(80, 255, 10, 0.2)",
  ];

  const dailyBorderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(210, 80, 255, 1)",
    "rgba(210, 255, 80, 1)",
    "rgba(80, 210, 255, 1)",
    "rgba(80, 255, 10, 1)",
  ];

  const weeklyBackgroundColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
  ];

  const weeklyBorderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
  ];

  const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [
      {
        label: type,
        data,
        backgroundColor: dailyBackgroundColors,
        borderColor: dailyBorderColors,
        borderWidth: 1,
        borderRadius: 1,
      },
    ],
  });

  const handleLoading = (value) => {
    setLoading(value);
  };

  const handleTypeChange = (newType) => {
    setType(newType);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const handleDailySelectChange = (e) => {
    const { value, name } = e.target;
    if (name === "month") {
      setDailyMonth(Number(value));
    } else setWeek(Number(value));
  };

  const handleWeeklySelectChange = (e) => {
    const { value } = e.target;
    setMonth(Number(value));
  };

  useEffect(() => {
    const isWeekly = time === "weekly";
    const newData =
      type === "expense"
        ? isWeekly
          ? weeklyCategoryExpense.length > 0
            ? weeklyCategoryExpense[month] || []
            : []
          : dailyCategoryExpense.length > 0
          ? (dailyCategoryExpense[dailyMonth] || [])[week] || []
          : []
        : isWeekly
        ? weeklyCategoryIncome.length > 0
          ? weeklyCategoryIncome[month] || []
          : []
        : dailyCategoryIncome.length > 0
        ? (dailyCategoryIncome[dailyMonth] || [])[week] || []
        : [];

    const newLabels = isWeekly
      ? ["Week 1", "Week 2", "Week 3", "Week 4"]
      : [
          weekDays[firstDayOfMonth],
          weekDays[(firstDayOfMonth + 1) % 7],
          weekDays[(firstDayOfMonth + 2) % 7],
          weekDays[(firstDayOfMonth + 3) % 7],
          weekDays[(firstDayOfMonth + 4) % 7],
          weekDays[(firstDayOfMonth + 5) % 7],
          weekDays[(firstDayOfMonth + 6) % 7],
        ];
    setData(newData);
    setLabels(newLabels);
    setChartData({
      labels: newLabels,
      datasets: [
        {
          label: type,
          data: newData,
          backgroundColor: isWeekly
            ? weeklyBackgroundColors
            : dailyBackgroundColors,
          borderColor: isWeekly ? weeklyBorderColors : dailyBorderColors,
          borderWidth: 1,
          borderRadius: 1,
        },
      ],
    });
  }, [
    type,
    time,
    week,
    month,
    dailyMonth,
    dailyCategoryIncome,
    dailyCategoryExpense,
    weeklyCategoryIncome,
    weeklyCategoryExpense,
  ]);

  useEffect(() => {
    if (time === "daily") {
      if (type === "expense") {
        fetchCategoryExpenseData(
          week,
          dailyMonth,
          expenseCategory,
          handleLoading
        );
      } else {
        fetchCategoryIncomeData(
          week,
          dailyMonth,
          incomeCategory,
          handleLoading
        );
      }
    } else {
      if (type === "expense") {
        fetchCategoryExpenseData(null, month, expenseCategory, handleLoading);
      } else {
        fetchCategoryIncomeData(null, month, incomeCategory, handleLoading);
      }
    }
  }, [
    type,
    time,
    week,
    month,
    expenseCategory,
    incomeCategory,
    dailyMonth,
    updateExpense,
    updateIncome,
  ]);

  const months = (
    <>
      <option
        value="0"
        className="bg-white text-gray-700 hover:bg-blue-100 border-b border-gray-200"
      >
        January
      </option>
      <option
        value="1"
        className="bg-white text-gray-700 hover:bg-blue-100 border-b border-gray-200"
      >
        February
      </option>
      <option
        value="2"
        className="bg-white text-gray-700 hover:bg-blue-100 border-b border-gray-200"
      >
        March
      </option>
      <option
        value="3"
        className="bg-white text-gray-700 hover:bg-blue-100 border-b border-gray-200"
      >
        April
      </option>
      <option
        value="4"
        className="bg-white text-gray-700 hover:bg-blue-100 border-b border-gray-200"
      >
        May
      </option>
      <option
        value="5"
        className="bg-white text-gray-700 hover:bg-blue-100 border-b border-gray-200"
      >
        June
      </option>
      <option
        value="6"
        className="bg-white text-gray-700 hover:bg-blue-100 border-b border-gray-200"
      >
        July
      </option>
      <option
        value="7"
        className="bg-white text-gray-700 hover:bg-blue-100 border-b border-gray-200"
      >
        August
      </option>
      <option
        value="8"
        className="bg-white text-gray-700 hover:bg-blue-100 border-b border-gray-200"
      >
        September
      </option>
      <option
        value="9"
        className="bg-white text-gray-700 hover:bg-blue-100 border-b border-gray-200"
      >
        October
      </option>
      <option
        value="10"
        className="bg-white text-gray-700 hover:bg-blue-100 border-b border-gray-200"
      >
        November
      </option>
      <option value="11" className="bg-white text-gray-700 hover:bg-blue-100">
        December
      </option>
    </>
  );

  const weeks = (
    <>
      <option
        value="0"
        className="bg-white text-gray-700 hover:bg-blue-100 border-b border-gray-200 px-10"
      >
        Week 1
      </option>
      <option
        value="1"
        className="bg-white text-gray-700 hover:bg-blue-100 border-b border-gray-200"
      >
        Week 2
      </option>
      <option
        value="2"
        className="bg-white text-gray-700 hover:bg-blue-100 border-b border-gray-200"
      >
        Week 3
      </option>
      <option value="3" className="bg-white text-gray-700 hover:bg-blue-100">
        Week 4
      </option>
    </>
  );

  const selectOptions =
    time === "daily" ? (
      <>
        <select
          name="week"
          value={week}
          onChange={handleDailySelectChange}
          className="p-2 border border-gray-300 rounded bg-gray-100 text-gray-700 outline-none"
        >
          {weeks}
        </select>
        <select
          value={dailyMonth}
          name="month"
          onChange={handleDailySelectChange}
          className="p-2 border border-gray-300 rounded bg-gray-100 text-gray-700 outline-none"
        >
          {months}
        </select>
      </>
    ) : (
      <select
        name="month"
        value={month}
        onChange={handleWeeklySelectChange}
        className="p-2 border border-gray-300 rounded bg-gray-100 text-gray-700 outline-none"
      >
        {months}
      </select>
    );

  const categoryOptions =
    type === "expense" ? (
      <select
        required
        value={expenseCategory}
        onChange={(e) => setExpenseCategory(e.target.value)}
        className="cursor-pointer mt-1.5 w-full p-2 border sm:text-sm border-gray-300 rounded bg-gray-100 text-gray-700 outline-none"
      >
        <option value="housing" className="bg-red-50">
          Housing (Rent/Mortgage)
        </option>
        <option value="utilities" className="bg-blue-50">
          Utilities (Electricity, Water, Internet)
        </option>
        <option value="groceries" className="bg-green-50">
          Groceries (Food,Shopping,Festivals,Daily Needs)
        </option>
        <option value="transportation" className="bg-yellow-50">
          Transportation (Fuel, Public Transit)
        </option>
        <option value="healthcare" className="bg-purple-50">
          Healthcare (Insurance, Medical Expenses)
        </option>
        <option value="education" className="bg-indigo-50">
          Education (Tuition, Books)
        </option>
        <option value="entertainment" className="bg-pink-50">
          Entertainment (Movies, Subscriptions)
        </option>
        <option value="debt" className="bg-red-50">
          Debt Repayment (Loans, Credit Cards)
        </option>
        <option value="savings" className="bg-green-50">
          Savings/Investments
        </option>
        <option value="other" className="bg-gray-50">
          Other
        </option>
      </select>
    ) : (
      <select
        required
        value={incomeCategory}
        onChange={(e) => setIncomeCategory(e.target.value)}
        className="cursor-pointer mt-1.5 w-full p-2 border sm:text-sm border-gray-300 rounded bg-gray-100 text-gray-700 outline-none"
      >
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
    );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 10,
          },
          padding: 10,
        },
      },
    },
  };

  return (
    <div className="w-full">
      <div className="flex flex-col xs:flex-row 2xs:justify-between gap-2 md:flex-col 2md:flex-row 2md:items-start 2md:justify-between mt-2 mx-2">
        <div className="flex justify-between gap-2 mb-2">
          <div className="flex flex-col items-center gap-2">
            <button
              className={`px-3 py-2 rounded-md ${
                type === "expense" ? "bg-[#4842d2] text-white" : "bg-gray-200"
              }`}
              onClick={() => handleTypeChange("expense")}
            >
              Expense
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                type === "income" ? "bg-[#4842d2] text-white" : "bg-gray-200"
              }`}
              onClick={() => handleTypeChange("income")}
            >
              Income
            </button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              className={`px-6 py-2 rounded-md ${
                time === "daily" ? "bg-[#4842d2] text-white" : "bg-gray-200"
              }`}
              onClick={() => handleTimeChange("daily")}
            >
              Daily
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                time === "weekly" ? "bg-[#4842d2] text-white" : "bg-gray-200"
              }`}
              onClick={() => handleTimeChange("weekly")}
            >
              Weekly
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-col sm:gap-2 md:gap-2">
          {selectOptions}
        </div>
      </div>
      <div className="mx-2 mb-2">{categoryOptions}</div>
      <div className="w-full h-[250px] sm:h-[400px] lg:h-[500px] p-2">
        {loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Audio
              height="50"
              width="50"
              color="#4842d2"
              ariaLabel="audio-loading"
              wrapperClass="wrapper-class"
              visible={true}
            />
          </div>
        ) : (
          <Doughnut data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default Pie;
