import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";

function Dashboard() {
  let [newCustomers,setNewCustomers] = useState([])
  useEffect(()=>{
    axios.get(`https://himalayanjava-server.onrender.com/latestcustomers`).then((res)=>{
      setNewCustomers(res.data)
    })
  },[])

  return (
    <div>
      <h2 className="text-2xl text-amber-900 font-semibold my-5">
            Dashboard
          </h2>

          <div className="flex justify-between text-[12px] mb-14">
            <h2 className="text-lg font-semibold text-amber-900">Overview</h2>
            <select name="time" id="">
              <option value="all time">All time</option>
              <option value="all time">8 hours</option>
              <option value="all time">12 hours</option>
              <option value="all time">24 hours</option>
            </select>
          </div>

          <div className="flex justify-between text-sm mb-10">
            <div>
              <h2>Customers</h2>
              <p className="text-[12px] text-center font-bold">{  
             newCustomers && newCustomers.customers ?
              newCustomers.total : "..."}</p>
            </div>
            <div>
              <h2>Income</h2>
              <p className="text-[12px] text-center font-bold">$39,459,780</p>
            </div>
          </div>

          <div className="text-sm mb-5">
            <h2>Welcome to our new customers</h2>
            <ul className="flex flex-wrap my-5 gap-10">
             

              {
                newCustomers && newCustomers.customers ? newCustomers.customers.map((customer)=>{
                  return  <li className="border-r-2 px-8">
                  <FaRegUserCircle className="text-5xl" />
                  <p className="text-center text-[10px]">{customer.name}</p>
                </li>
                 }) : "Loading..."
              }

              {/* <li className="border-r-2 px-8">
                <FaRegUserCircle className="text-5xl" />
                <p className="text-center text-[10px]">Didinya J.</p>
              </li>
              <li className="border-r-2 px-8">
                <FaRegUserCircle className="text-5xl" />
                <p className="text-center text-[10px]">Penny L.</p>
              </li>
              <li className="border-r-2 px-8">
                <FaRegUserCircle className="text-5xl" />
                <p className="text-center text-[10px]">Elon M.</p>
              </li> */}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-amber-900">
              Total income
            </h2>
            <div className="h-[140px] w-full bg-cover">
              <img
                className="h-full w-full"
                src="../bargraph.jpg"
                alt=""
              />
            </div>
          </div>
    </div>
  )
}

export default Dashboard