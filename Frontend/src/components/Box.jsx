const Box = ({ bg = "", text, amount, icon }) => {
  return (
    <div
      className={`border-2 border-gray-300 relative flex flex-col items-center justify-center overflow-auto text-center p-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:shadow-xl ${bg}`}
    >
      <div className="relative z-10 mb-2 p-2 bg-white rounded-full shadow-lg">
        {icon}
      </div>
      <div className="relative z-10">
        <p className="text-lg font-medium text-white mb-2 capitalize">{text}</p>
        <h1 className="text-4xl font-bold text-white">₹ {amount}</h1>
      </div>
    </div>
  );
};

export default Box;
