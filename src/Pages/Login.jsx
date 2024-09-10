import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import axios from "axios";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`https://himalayanjava-server.onrender.com/login`, user)
      .then((res) => {
        toast("Logged in successfully!", { autoClose: 2000 });
        navigate("/home");
        localStorage.setItem("access_token", res.data.data.token);
        localStorage.setItem("userId", res.data.data._id);
        localStorage.setItem("initialdata", JSON.stringify(res.data.data));
      })
      .catch((err) => {
        if (err.response.status) {
          toast.error(err.response.data.msg, { autoClose: 2000 });
        } else {
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
          });
          console.log("Error:", err);
        }
        setLoading(false);
      });
  }

  return (
    <>
      {loading ? (
        <div className="h-[100vh] w-full fixed z-50 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-semibold text-amber-900">Loading...</h2>
          <img src="../loading1.gif" alt="" className="w-24 h-24" />
        </div>
      ) : (
        <div className="relative bg-white flex h-[100vh] flex-col items-center py-10">
          <div className="w-[320px] px-5 md:w-[400px]">
            <div className="flex justify-center">
              <div className="h-24 w-24">
                <img
                  src="../himalayanjava-logo.png"
                  alt=""
                  className="w-full h-full"
                />
              </div>
            </div>
            <h2 className="text-2xl text-indigo-950 my-10">
              Log in &nbsp;&nbsp; 👋
            </h2>
            <div className="text-[#8E8E8F]">
              <form onSubmit={handleSubmit}>
                <div className="border-[1px] border-[#323334] rounded-md">
                  <div className="px-5 py-2 border-b-[1px] border-[#323334]">
                    <label htmlFor="email" className="cursor-text">
                      Your login
                    </label>
                    <br />
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="bg-transparent outline-none w-full"
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                  <div className="items-center px-5 py-2 border-b-[1px] border-[#323334]">
                    <div className="flex justify-between items-center">
                      <label htmlFor="password" className="cursor-text">
                        Password
                      </label>
                      {showPassword ? (
                        <IoEyeOffSharp
                          className="text-xl cursor-pointer"
                          onClick={() => setShowPassword((value) => !value)}
                        />
                      ) : (
                        <IoEyeSharp
                          className="text-xl cursor-pointer"
                          onClick={() => setShowPassword((value) => !value)}
                        />
                      )}
                    </div>
                    <input
                      type={showPassword == true ? "text" : "password"}
                      name="password"
                      id="password"
                      className="bg-transparent outline-none w-full"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex justify-center my-10">
                  <button
                    disabled={loading}
                    className="disabled:bg-[#dad7d3] disabled:cursor-no-drop px-7 py-3 text-amber-900 bg-[#D8C3A5] rounded-md"
                  >
                    Log in
                  </button>
                </div>
                <div className="flex justify-center gap-4 my-3 text-indigo-950">
                  <Link to="/signup">Sign up</Link>
                  <Link to="/forgotpassword">Reset password</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
