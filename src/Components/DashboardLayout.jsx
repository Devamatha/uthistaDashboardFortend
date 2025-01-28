import React, { useState } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import { Outlet } from "react-router-dom";
import { faListSquares, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DashboardLayout() {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  // Toggle function for sidenav
  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>

      <div className="flex flex-1 mt-[120px]">
        <div
          className={`fixed top-[120px] Sidenav bottom-0 overflow-y-auto transition-all duration-300 ease-in-out
          lg:w-[21%] xl:w-[15%] ${isSidenavOpen ? "w-[60%]" : "w-0"}
          bg-white shadow-md xl:block lg:block hidden`}
        >
          <Sidenav />
        </div>

        <div className="flex-1 lg:ml-[21%] xl:ml-[15%] p-[20px] overflow-y-auto h-[calc(100vh-12%)]">
          <button
            onClick={toggleSidenav}
            className="cursor-pointer lg:hidden mb-4 p-2  rounded-md "
          >
            <FontAwesomeIcon
              icon={faListSquares}
              className="text-[#FFA974] w-[32px] h-[32px]"
            />
          </button>

          <Outlet />
        </div>
      </div>
      <div
        className={`fixed top-[120px] left-0 bottom-0 md:w-[33%] w-[60%] bg-white shadow-md Sidenav z-20 lg:hidden 
    transition-transform  duration-500 ease-in-out 
    ${
      isSidenavOpen
        ? "translate-x-0 opacity-100"
        : "-translate-x-full opacity-0"
    }`}
      >
        <Sidenav />
        <button onClick={toggleSidenav} className="absolute top-4 right-4">
          <FontAwesomeIcon
            icon={faXmark}
            className="w-[32px] h-[32px] text-black"
          />
        </button>
      </div>
    </div>
  );
}

export default DashboardLayout;
