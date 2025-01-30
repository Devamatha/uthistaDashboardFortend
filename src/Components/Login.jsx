import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {

    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_DB;
    const environment = process.env.REACT_APP_NODE_ENV;
    const [username, setUername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
 
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setLoading(true);
      let formErrors = { username: "", password: "" };
  
      if (!username) {
        formErrors.username = "Enter your email";
      }
  
      if (!password) {
        formErrors.password = "Enter your password";
      } else if (password.length < 5) {
        formErrors.password = "Password should be at least 5 characters long";
      }
  
      setErrors(formErrors);
      if (formErrors.username || formErrors.password) {
        setLoading(false);
        return;
      }
      if (!formErrors.username && !formErrors.password) {
        const formData = new FormData();
        formData.append("email", username);
        formData.append("password", password);
        try {
          const response = await fetch(`${apiUrl}uthista/login`, {
            method: "POST",
           
          body: formData,
            credentials: 'include',
          });
          console.log(response);
          if (response.ok) {
            const data = await response.json();
            Swal.fire({
              icon: "success",
              title: "Login Successful",
              text: "You have successfully logged in!",
            });
            navigate("/layout/usersList");
            setLoading(false);
           
          } else {
            const errorData = await response.json();
           console.log(errorData+"errorData");
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: errorData.message || "Login failed. Please try again.",
            });
            setLoading(false);
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred. Please try again.",
          });
          setLoading(false);
  
        }
      }
    };
  
    const handleEmailFocus = () => {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    };
  
    const handlePasswordFocus = () => {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    };
  
  return (
    <div className="bg-img">
    <div className="max-w-1440  lg:w-[100%]  mx-auto  ">
     
      <div className=" h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h1 className="text-white md:text-[48px] text-[28px] text-center font-bold md:leading-[56px] leading-[32.79px] totalPage">
              Welcome Back
            </h1>
            <p className="font-normal text-white md:text-[16px] text-[14px] text-center">
              Sign in to continue exploring and enjoying all the features we
              have to offer.
            </p>
          </div>
          <div className="auth-card py-[36px] md:px-[36px] px-[30px]  rounded-[6px] md:mx-0 mx-4">
            <div className="mb-4 h-[90px]">
              <label className="block text-white font-medium mb-1 md:text-[24px] text-[16px]">
                Enter your Mail-ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-white outline-none"
                  required
                  value={username}
                  onChange={(e) => setUername(e.target.value)}
                  onFocus={handleEmailFocus}
                />
            
              </div>
              {errors.username && (
                <p className="text-red-500 md:text-[16px] text-[13px] mt-1">
                  {errors.username}
                </p>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-white font-medium mb-1 md:text-[24px] text-[16px]">
                Enter Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="w-full px-4 py-2 rounded-lg bg-white outline-none"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handlePasswordFocus}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <FaEyeSlash className="md:h-[24px] h-[20px] md:w-[24px] h-[20px]" />
                  ) : (
                    <FaEye className="md:h-[24px] h-[20px] md:w-[24px] h-[20px]" />
                  )}
                </div>
              </div>
            </div>
            <div className="mb-5 flex justify-between">
              <div>
                {errors.password && (
                  <p className="md:text-[16px] text-[13px] text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>
              {/* <div>
                <p
                  className="text-end md:text-[18px] text-[16px] text-white cursor-pointer"
                  onClick={() => navigate("/ResetPassword")}
                >
                  Forget Password
                </p>
              </div> */}
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-full bg-[#000000] text-[24px] text-white h-[50px] rounded-[5px] hover:bg-[#fb8b24] transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <span>
                    
                    Loading
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            {/* <div className="mt-7">
              <p className="text-white md:text-[18px] text-[16px]">
                Don't have an account?{" "}
                <span
                  className="font-bold cursor-pointer md:text-[20px] text-[18px]"
                  onClick={() => navigate("/Signup")}
                >
                  Sign Up For Free
                </span>
              </p>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login