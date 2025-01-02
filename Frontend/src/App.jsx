import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Sidebar from "./components/Sidebar";
import BudgetExpense from "./pages/BudgetExpense";
import Dashboard from "./pages/Dashboard";
import Upgrade from "./pages/Upgrade";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOtp";
import { AppContext } from "./utils/Context";
import Reset from "./pages/Reset";
import { Audio } from "react-loader-spinner";

const App = () => {
  const { loggedIn, isLogging, isRefreshing } = useContext(AppContext);
  if (isRefreshing) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Audio
          height="200"
          width="200"
          color="#4842d2"
          ariaLabel="audio-loading"
          wrapperClass="wrapper-class"
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      {!loggedIn && !isLogging && (
        <div className="flex flex-col justify-center w-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      )}
      {!loggedIn && isLogging && (
        <div className="flex justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-50 gap-5 w-screen">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<VerifyOTP />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      )}
      {loggedIn && (
        <>
          <Navbar />
          <div className="overflow-hidden main flex justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-50 sm:px-4 px-2 py-2 gap-3 sm:gap-5">
            <Sidebar />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/incomes" element={<Income />} />
              <Route path="/dashboard/expenses" element={<Expense />} />
              <Route
                path="/dashboard/expense/:id"
                element={<BudgetExpense />}
              />
              <Route path="/dashboard/upgrade" element={<Upgrade />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
};

export default App;
