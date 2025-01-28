import React from "react";
import logo from "../../src/assets/Images/logo.png";
import bxs_user from "../../src/assets/Images/bxs_user.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();

    try {
      localStorage.clear();
      sessionStorage.clear();
     
    } catch {
    } finally {
      navigate("/", { replace: true });
    }
  };
  return (
    <div
      className="container-fluid bg-white w-[100%] h-[120px] d-flex justify-content-between Sidenav border-b border-[#A9A9A9] "
     
    >
      <div className="d-flex justify-content-center align-items-center gap-4 ">
        <img src={logo} alt="logo" className="w-[81px] h-[81px]"></img>
        <p className="text-[#FF914D] font-sans text-sm font-bold leading-normal text-[14px] ">
          Utista Foundation
        </p>
      </div>

     

      <div className="dropdown navbar-brand d-flex justify-content-center align-items-center">
        <button
          className="btn  text-white dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img src={bxs_user} alt="logo" className="w-[46px] h-[46px]"></img>
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item text-[#FFA974]" onClick={logout}>Logout</a>
          </li>
        </ul>
      </div>

      
    </div>
  );
}

export default Header;
