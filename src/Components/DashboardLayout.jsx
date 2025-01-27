import React from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className=" flex flex-col h-screen overflow-hidden">
      <div className=" fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>
 
      <div className=" flex   flex-1 mt-[120px]">
        <div className=" Sidenav fixed bottom-0 overflow-y-auto lg:w-[20%] xl:w-[15%]  top-[120px]">
          <Sidenav />
        </div>

        <div className=" flex-1 lg:ml-[20%]  xl:ml-[15%] p-[20px]  overflow-y-auto h-[calc(100vh-12%)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
