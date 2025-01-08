import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as Charjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Charjs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import { AppContext } from "../utils/Context";
import { Audio } from "react-loader-spinner";

const Chart = () => {
  const {
    updateExpense,
    updateIncome,
    dailyExpense,
    dailyIncome,
    weeklyExpense,
    weeklyIncome,
    fetchExpenseData,
    fetchIncomeData,
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
  const [time, setTime] = useState("daily");
  const [type, setType] = useState("expense");
  const [week, setWeek] = useState(weekIndex);
  const [month, setMonth] = useState(currentMonth);
  const [dailyMonth, setDailyMonth] = useState(currentMonth);
  const [data, setData] = useState([...dailyExpense]);
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

  const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [
      {
        label: type,
        data,
        backgroundColor: "rgba(255,0,0,0.2)",
        borderColor: "rgba(255,0,0,1)",
        borderWidth: 1,
        borderRadius: 3,
      },
    ],
  });

  useEffect(() => {
    if (time === "daily") {
      if (type === "expense") fetchExpenseData(week, dailyMonth, handleLoading);
      else fetchIncomeData(week, dailyMonth, handleLoading);
    } else {
      if (type === "expense") fetchExpenseData(null, month, handleLoading);
      else fetchIncomeData(null, month, handleLoading);
    }
  }, [type, time, week, month, dailyMonth, updateExpense, updateIncome]);

  useEffect(() => {
    const isWeekly = time === "weekly";
    const newData =
      type === "expense"
        ? isWeekly
          ? weeklyExpense.length > 0
            ? weeklyExpense[month] || []
            : []
          : dailyExpense.length > 0
          ? (dailyExpense[dailyMonth] || [])[week] || []
          : []
        : isWeekly
        ? weeklyIncome.length > 0
          ? weeklyIncome[month] || []
          : []
        : dailyIncome.length > 0
        ? (dailyIncome[dailyMonth] || [])[week] || []
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
          backgroundColor:
            type === "expense" ? "rgba(255,0,0,0.2)" : "rgba(0,0,255,0.2)",
          borderColor:
            type === "expense" ? "rgba(255,0,0,1)" : "rgba(0,0,255,1)",
          borderWidth: 1,
          borderRadius: 3,
        },
      ],
    });
  }, [
    type,
    time,
    week,
    month,
    dailyMonth,
    dailyExpense,
    dailyIncome,
    weeklyExpense,
    weeklyIncome,
  ]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [5, 5],
        },
      },
    },
  };

  const handleLoading = (val) => {
    setLoading(val);
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

  return (
    <div className="w-full">
      <div className="flex flex-col xs:flex-row 2xs:justify-between gap-2 md:flex-col 2md:flex-row 2md:items-start 2md:justify-between mb-4 mt-2 mx-2">
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
      <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px]">
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
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

export default Chart;
