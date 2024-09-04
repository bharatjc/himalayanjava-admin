import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {

  const [email, setEmail] = useState()
const navigate = useNavigate()

function handleSubmit(e){
  e.preventDefault();
  axios
      .post(`https://himalayanjava-server.onrender.com/forgotpassword`, {email})
      .then(res => {
        if(res.data.Status === "Success") {
            navigate('/login')
        }
        toast("Url is sent to your email", { autoClose: 2000 });
    }).catch(err => console.log(err))
}

  return (
    <div className="flex h-[100vh] flex-col justify-center items-center py-10 bg-white">
      <div className="w-[320px] px-5 md:w-[400px]">
      <div className='flex items-center mb-10 gap-x-5'>
      <div className="h-16 w-16 flex items-center bg-cover">
           <Link to="/">
           <img src="../himalayanjava-logo.png" alt="" />
           </Link> 
          </div>
          <h2 className="text-2xl font-semibold">Forgot Password</h2>
      </div>
        <div className="text-[#8E8E8F]">
          <form onSubmit={handleSubmit}>
            <div className="border-[1px] border-[#323334] rounded-md">
              <div className="px-5 py-2 border-b-[1px] border-[#323334]">
                <label htmlFor="email" className="cursor-text">
                  Enter email
                </label>
                <br />
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-transparent outline-none w-full"
                  onChange={(e)=>{
                    setEmail(e.target.value)
                  }}
                />
                <br />
              </div>
            </div>
            <div className="flex justify-center my-10">
              <button className="px-7 py-3 text-amber-900 bg-[#D8C3A5] rounded-md">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
