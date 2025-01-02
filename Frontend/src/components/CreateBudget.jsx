import React from "react";

const CreateBudget = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border border-gray-400 bg-gray-200 rounded-md cursor-pointer flex items-center justify-center p-10 flex-col gap-5 hover:shadow-lg"
    >
      <span className="bg-gray-400 text-black h-9 w-9 flex items-center justify-center rounded-full border-dashed border-2 border-black">
        +
      </span>
      <p className="text-xl text-center font-semibold capitalize">
        Create Budget
      </p>
    </div>
  );
};

export default CreateBudget;
