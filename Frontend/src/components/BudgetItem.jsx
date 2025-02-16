import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";
import { ShimmerContentBlock } from "react-shimmer-effects";

const BudgetItem = ({ budget, styles = "" }) => {
  const calculatePercent = () => {
    const percent = (budget.spent * 100) / budget.amount;
    return percent.toFixed(0);
  };

  const percent = Number(calculatePercent());

  const getBgColor = (percent) => {
    if (percent >= 0 && percent <= 50) return "#3f0";
    if (percent > 50 && percent <= 75) return "yellow";
    if (percent > 75 && percent <= 90) return "orange";
    return "red";
  };

  return (
    <div className={`relative ${styles} hover:shadow-lg`}>
      {budget?._id ? (
        <Link
          to={`/dashboard/expense/${budget._id}`}
          key={budget._id}
          className={`flex flex-col justify-between cursor-pointer p-4 rounded-md border border-gray-400 bg-gray-200 h-full`}
        >
          <div className="flex flex-col lg:flex-row md:items-start justify-between">
            <div className="flex flex-col md:mb-4 md:justify-start md:w-full md:flex-row items-center justify-center md:gap-4">
              <span className="cursor-pointer mb-4 md:mb-0 rounded-full h-16 w-16 p-2 flex items-center justify-center border-2 bg-gray-600">
                <img
                  className="object-cover object-center w-full h-full"
                  src={budget.image}
                  alt="emoji"
                />
              </span>
              <div className="w-full flex items-center justify-between md:w-fit md:flex-col md:items-start">
                <h3 className="2xs:text-lg lg:text-xl 3xs:text-[12px] text-left">
                  {budget.title}
                </h3>
                <h4 className="text-md lg:text-lg text-gray-500 text-right 3xs:text-sm">
                  {budget.category}
                </h4>
              </div>
            </div>
            <div className="flex gap-1 items-center justify-between w-full lg:flex-col lg:items-end py-2 text-[#4842c2]">
              <h2 className="2xs:text-lg sm:text-xl 3xs:text-[12px] text-left">
                ₹{budget.amount}
              </h2>
              <p className="text-gray-800 lg:text-sm 2xs:text-[12px] 3xs:text-[10px] text-right">
                {budget.date} | {budget.time}
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex mt-4 mb-1 items-center justify-between gap-2">
              <h1 className="2xs:text-sm md:text-xl text-gray-800 3xs:text-[12px]">
                ₹{budget.spent} Spent
              </h1>
              <h1 className="2xs:text-sm md:text-lg text-gray-800 3xs:text-[12px]">
                ₹{Math.round((budget.amount - budget.spent) * 100) / 100} Rem
              </h1>
            </div>
            <ProgressBar
              completed={percent}
              bgColor={getBgColor(percent)}
              baseBgColor="#00000020"
              height="15px"
              width="100%"
              borderRadius="5px"
              labelSize="12px"
              labelColor="#000"
              labelAlignment="center"
              animateOnRender
              transitionDuration="0.5s"
              isLabelVisible={percent < 5 ? false : true}
            />
          </div>
        </Link>
      ) : (
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <ShimmerContentBlock
            title={true}
            text={true}
            cta={true}
            width={300}
            height={100}
          />
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
