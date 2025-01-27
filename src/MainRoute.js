import React from "react";
import { Route, Routes } from "react-router-dom";
import UsersList from "./Components/UsersList";
import EmployeeExpenditure from "./Components/EmployeeExpenditure";
import Expenses from "./Components/Expenses";
import DashboardLayout from "./Components/DashboardLayout";
import Login from "./Components/Login";
function MainRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/layout" element={<DashboardLayout />}>
          <Route path="/layout/usersList" element={<UsersList />} />
          <Route path="/layout/EmployeeExpenditure" element={<EmployeeExpenditure />} />
          <Route path="/layout/Expenses" element={<Expenses />} />
        </Route>
       
      </Routes>
    </div>
  );
}

export default MainRoute;
