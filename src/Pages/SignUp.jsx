import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setFormErrors(value => value.filter(error => error.field !== name));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormErrors([]);
    setLoading(true)
    axios
      .post(`https://himalayanjava-server.onrender.com/api/signup`, {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      })
      .then((res) => {
        toast("Signup successfully!", { autoClose: 2000 });
        navigate("/");
      })
      .catch((err) => {
        let errors = err.response?.data?.errors;
        if (err?.response?.status === 400 && errors) {
          setFormErrors(errors);
        }
        setLoading(false)
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
      });
    }

  return (
    <div className="h-[100vh] flex flex-col items-center py-10 bg-gray-200">
      <div className="w-[320px] md:w-[400px]">
        <div className="flex justify-center">
        <div className="h-24 w-24">
            <img src="../himalayanjava-logo.png" alt="" className='w-full h-full'/>
          </div>
        </div>
        <h2 className="text-2xl text-indigo-950 py-7">
          Create an account &nbsp;&nbsp; 🚀
        </h2>
        <div className="text-[#8E8E8F]">
          <form onSubmit={handleSubmit}>
            <div className="border-[1px] border-[#323334] rounded-md">
              <div className="px-5 py-2 border-b-[1px] border-[#323334]">
                <label htmlFor="username" className="cursor-text">
                  Username
                </label>
                <br />
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="bg-transparent outline-none w-full"
                  value={inputs.username}
                  onChange={handleChange}
                  required
                />
                <br />
                <p className="text-[12px] text-red-500">
                  {formErrors.find(error => error.field === "username")?.message}
                </p>
              </div>
              <div className="px-5 py-2 border-b-[1px] border-[#323334]">
                <label htmlFor="email" className="cursor-text">
                  E-mail address
                </label>
                <br />
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="bg-transparent outline-none w-full"
                  value={inputs.email}
                  onChange={handleChange}
                  required
                />
                <br />
                <p className="text-[12px] text-red-500">
                {formErrors.find(error => error.field === "email")?.message || formErrors.find(error => error.field === "email")?.msg}
                </p>
              </div>
              <div className="px-5 py-2">
                <label htmlFor="password" className="cursor-text">
                  Password
                </label>
                <br />
                <input
                  type="text"
                  id="password"
                  name="password"
                  className="bg-transparent w-full outline-none"
                  value={inputs.password}
                  onChange={handleChange}
                  required
                />
                <br />
                <p className="text-[12px] text-red-500">
                  {formErrors.find(error => error.field === "password")?.message}
                </p>
              </div>
            </div>
            <h2 className="my-3 text-[14px] text-center text-indigo-950">
              By signing up you agree to our terms and privacy policy
            </h2>
            <div className="flex justify-center my-10">
              <button
              disabled={loading}
              type="submit"
              className="disabled:bg-[#dad7d3] disabled:cursor-no-drop px-4 py-2 text-amber-900 bg-[#D8C3A5] rounded-md">
                Create an account
              </button>
            </div>
            <div className="flex justify-center gap-4 my-3 text-indigo-950">
              <Link to="/">Login</Link>
              <Link to ="/forgotpassword">Reset password</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
