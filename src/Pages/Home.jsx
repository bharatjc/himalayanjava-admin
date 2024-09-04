import React from 'react';
import { FaHome, FaPlus, FaRegBell, FaUser } from "react-icons/fa";
import { MdMiscellaneousServices, MdOutlineMenuBook, MdEdit } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsFillHouseAddFill } from "react-icons/bs";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { LuLogOut } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-[#D3D3D3] flex items-center justify-center min-h-screen p-5">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl gap-x-5 gap-y-10">
        
        <div className="rounded-xl w-full md:w-1/5 bg-white flex flex-col justify-between p-5 text-amber-900 text-sm shadow-lg">
          <div className="flex flex-col items-center mb-10">
            <img src="../himalayanjava-logo.png" alt="Logo" className='h-20 w-20 mb-5' />
          </div>
          <ul className="flex flex-col gap-5 mb-5">
            <li className="flex gap-3 items-center">
              <FaHome className="text-2xl" />
              <Link to="dashboard">Dashboard</Link> 
            </li>
            <li className="flex gap-3 items-center">
              <MdMiscellaneousServices className="text-2xl"/>
              <Link to="addservices">Add Services</Link> 
            </li>
            <li className="flex gap-3 items-center">
              <HiOutlineUsers className="text-2xl" />
              <Link to="customerinfo">Customers</Link>
            </li>
            <li className="flex gap-3 items-center">
              <MdOutlineMenuBook className="text-2xl"/>
              <Link to="addmenu">Menu Items</Link>
            </li>
            <li className="flex gap-3 items-center">
              <BsFillHouseAddFill className="text-2xl"/>
              <Link to="addnewoutlets">New Outlets</Link> 
            </li>
            <li className="flex gap-3 items-center">
              <FaHandHoldingDollar className="text-2xl"/>
              <Link to="income">Income</Link> 
            </li>
          </ul>
          <div className="border-t-2 pt-20 flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <RxQuestionMarkCircled className="text-2xl" />
              <Link to="help">Help</Link> 
            </div>
            <div className="flex gap-3 items-center">
              <LuLogOut className="text-2xl" />
              <Link to="/">Logout</Link>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/5 bg-white rounded-xl p-5 text-amber-900 shadow-lg">
          <div className="flex items-center gap-3 mb-5">
            <CiSearch className="text-2xl" />
            <input
              className="bg-transparent text-sm w-full outline-none border-b border-gray-300 p-1"
              type="text"
              placeholder="Search or type a command"
            />
          </div>
          <Outlet />
        </div>

        <div className="w-full md:w-1/5 bg-white rounded-xl p-5 text-amber-900 shadow-lg">
          <div className="flex justify-between items-center mb-10">
            <button className="flex text-sm text-amber-900 font-bold items-center gap-2 px-3 py-2 bg-[#D8C3A5] rounded-lg">
              <FaPlus />
              <Link to="updateprofile">Update</Link>
            </button>
            <MdEdit className="text-3xl md:text-2xl" />
            <FaRegBell className="text-3xl md:text-2xl" />
          </div>

          <div className="flex items-center justify-center mb-10">
            <div className="p-2 border-2 rounded-full mr-3">
              <FaUser className="text-2xl" />
            </div>
            <p className="text-sm">
              Hi, <span className="text-green-400">seller</span>
            </p>
          </div>

          <h2 className="text-lg font-semibold mb-5">Popular Outlets</h2>
          <div className="flex justify-between text-sm mb-10">
            <p className="w-[65%]">Outlets</p>
            <p className="w-[30%]">Items</p>
          </div>
          <div>
            <h2 className="mb-5 font-semibold">Comments</h2>
            <p className="text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
