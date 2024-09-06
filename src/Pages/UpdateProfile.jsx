import React, { useEffect, useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function UpdateProfile() {

  let admin = JSON.parse(localStorage.getItem("initialdata"))

  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    username: admin?.username || "",
    email: admin?.email || "",
    password: "",
    businessname: admin?.businessname || "",
    image: null
  })
  const [formErrors, setFormErrors] = useState([]);

  function handleChange(e){
    const {name, value, files} = e.target;
    if (name === "image") {
      setUserData({ ...userData, image: files[0] });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  }

let userId = localStorage.getItem("userId")

  function handleSubmit(e){
    e.preventDefault()
    setLoading(true);
    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('businessname', userData.businessname);
    if (userData.image) {
      formData.append('image', userData.image);
    }
    if (userData.password) {
      formData.append('password', userData.password);
    }
    axios
      .put(`https://himalayanjava-server.onrender.com/update/${userId}`, formData,
    )
      .then((res) => {
        localStorage.setItem("initialdata", JSON.stringify(res.data.responseUser))
        toast("Profile updated successfully!", { autoClose: 2000 });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        let errors = err.response?.data?.errors;
        if (err?.response?.status === 400 && errors) {
          setFormErrors(errors);
        } else {
          toast.error("Something went wrong", { autoClose: 2000 });
        }
      });
  }

  return (
    <div className="md:px-10 pb-5">
      <h2 className="md:text-center text-2xl text-amber-900 font-semibold my-5">
        Update Profile
      </h2>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-[40%] bg-cover">
          {
            admin.image? <img src= {admin.image} alt="" className="w-36 h-36 rounded-md object-cover" />:
            <img src= "../user.png" alt="" className="w-36 h-36 rounded-md object-cover" />
          }
          
          <h2 className="text-center text-lg w-36">
            {
              admin.username
            }
            </h2>
        </div>
        <div className="w-full md:w-[55%]">
        <form onSubmit={handleSubmit} className="w-full">
      <label htmlFor="username">
        Username*
      </label>
      <input
        className="p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm rounded-md"
        id="username"
        name="username"
        type="text"
        value={userData.username}
        onChange={handleChange}
      />
      <label htmlFor="email">
        Email*
      </label>
      <input
        className="p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm rounded-md"
        name="email"
        type="email"
        id="email"
        value={userData.email}
        onChange={handleChange}
      />
      <label htmlFor="password">
        Password*
      </label>
      <input
        className="p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm rounded-md"
        name="password"
        type="password"
        id="password"
        value={userData.password}
        onChange={handleChange}
      />
      <label htmlFor="businessname">
        Business name*
      </label>
      <input
        className="p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm rounded-md"
        name="businessname"
        type="text"
        id="businessname"
        value={userData.businessname}
        onChange={handleChange}
      />
      <label htmlFor="image">
        Profile Picture
      </label>
      <input
        className="p-2 w-full border-[1px] border-[#C2C5E1] text-sm rounded-md"
        name="image"
        type="file"
        id="image"
        onChange={handleChange}
      />
      <button disabled={loading} className="disabled:bg-[#dad7d3] disabled:cursor-no-drop bg-[#D8C3A5] text-amber-900 px-3 py-2 mt-5 text-[16px] rounded-lg">
        Save data
      </button>
    </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
