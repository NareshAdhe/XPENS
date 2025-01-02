import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils/Context";
import BudgetItem from "./BudgetItem";

const getParsedDate = (inputDate) => {
  let [date, month, year] = inputDate.split("-").map(Number);
  year += 2000;
  return new Date(year, month - 1, date);
};

const getFormattedDate = (inputDate) => {
  const [year, month, date] = inputDate.split("-");
  const formattedDate = `${date}-${month}-${year.slice(-2)}`;
  return formattedDate;
};

const BudgetList = ({ category, startDate, endDate }) => {
  const { budgetList } = useContext(AppContext);
  const [filteredBudgets, setFilteredBudgets] = useState([]);

  useEffect(() => {
    const filterBudgets = () => {
      let filtered = budgetList;

      if (category) {
        filtered = filtered.filter((budget) => budget.category === category);
      }

      if (startDate) {
        let formattedStartDate = getFormattedDate(startDate);
        const newStartDate = getParsedDate(formattedStartDate);
        filtered = filtered.filter((budget) => {
          const newBudgetDate = getParsedDate(budget.date);
          return newBudgetDate >= newStartDate;
        });
      }

      if (endDate) {
        let formattedEndDate = getFormattedDate(endDate);
        const newEndDate = getParsedDate(formattedEndDate);
        filtered = filtered.filter((budget) => {
          const newBudgetDate = getParsedDate(budget.date);
          return newBudgetDate <= newEndDate;
        });
      }

      setFilteredBudgets(filtered);
    };

    filterBudgets();
  }, [category, startDate, endDate, budgetList]);

  return (
    <>
      {filteredBudgets.map((budget) => (
        <BudgetItem key={budget._id} budget={budget} />
      ))}
    </>
  );
};

export default BudgetList;
