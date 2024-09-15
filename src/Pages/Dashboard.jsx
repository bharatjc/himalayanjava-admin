import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

function Dashboard() {
  let [newCustomers, setNewCustomers] = useState([]);
  let [income, setIncome] = useState([]);
  let [overflow, setOverflow] = useState(false);
  let [dataStyle, setDataStyle] = useState("table")
  useEffect(() => {
    axios
      .get(`https://himalayanjava-server.onrender.com/order`)
      .then((res) => {
        setNewCustomers(res.data);
        console.log(res.data)
      });

    axios
      .get(`https://himalayanjava-server.onrender.com/income`)
      .then((res) => {
        setIncome(res.data);
      });
      console.log(newCustomers)
  }, []);

  const chartData = income.profitData
    ? income.profitData.map((item) => ({
        name: new Date(item.createdAt).toLocaleDateString(),
        sales: item.sales,
        expenses: item.expenses,
        profit: item.profit,
      }))
    : [];

  return (
    <div>
      <h2 className="text-2xl text-amber-900 font-semibold my-5">Dashboard</h2>
      <div className="flex justify-between text-[12px] mb-14">
        <h2 className="text-lg font-semibold text-amber-900">Overview</h2>
        <select name="dataStyle" id="" onChange={(e) => setDataStyle(e.target.value)} value={dataStyle}>
          <option value="table">Show income</option>
          <option value="table">table</option>
          <option value="barGraph">bar graph</option>
          <option value="lineGraph">line graph</option>
        </select>
      </div>

      <div className="flex justify-between text-sm mb-10">
        <div>
          <h2>Customers</h2>
          <p className="text-[12px] text-center font-bold">
            {newCustomers && newCustomers.orders
              ? newCustomers.total
              : "..."}
          </p>
        </div>
        <div>
          <h2>Income</h2>
          <p className="text-[12px] text-center font-bold">
            ₹.{" "}
            {income && income.profitData && income.totalProfit
              ? income.totalProfit[0].totalProfit
              : "..."}{" "}
          </p>
        </div>
      </div>

      <div className="text-sm mb-5">
        <h2>Welcome to our new customers</h2>
        <ul className="flex flex-wrap my-5 gap-10">
          {newCustomers.orders && newCustomers.orders.length > 0 ? newCustomers.orders.slice(0, 4).map((order, index) => {
                return (
                  <li
                    key={index}
                    className="border-r-2 px-8 flex flex-row md:flex-col gap-x-8 items-center md:gap-x-0"
                  >
                    <FaRegUserCircle className="text-5xl" />
                    <p className="text-center text-[10px]">{order.customer}</p>
                  </li>
                );
              })
            : "Loading..."}
        </ul>
      </div>
      <div className="mt-10">

        {
          dataStyle === "table" && (
            <div>
              <div className='flex items-center justify-between mb-10'>
            <h2 className="text-lg font-semibold text-amber-900">
              Total income: 
            </h2>
            <button className='text-amber-900 text-sm items-center gap-2 px-3 py-2 rounded-lg bg-[#D8C3A5]' onClick={()=>{
              setOverflow(!overflow)
            }}>See all entries</button>
            </div>
            
            <div className={`relative ${overflow ? 'h-auto' : 'h-[300px]'} w-full bg-cover overflow-hidden`}>
             <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-amber-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" className="text-[10px] px-2 md:px-6 py-3">
                S.N.
              </th>
                <th scope="col" className="text-[10px] px-1 md:px-6 py-3">
                    Date
                </th>
                <th scope="col" className="text-[10px] px-1 md:px-6 py-3">
                    Sales
                </th>
                <th scope="col" className="text-[10px] px-1 md:px-6 py-3 hidden md:block">
                    Expenses
                </th>
                <th scope="col" className="text-[10px] px-1 md:px-6 py-3">
                Profit
                </th>
                </tr>
              </thead>

              <tbody>
                {
                  income && income.profitData ? (
                    income.profitData.map((profit,index)=>{
                      return <tr key={index}>
                         <td className='px-1 md:px-6 py-3'>{index+1}</td>
                         <td className='px-1 md:px-6 py-3'>{(profit.createdAt).slice(5,10)}</td>
                         <td className='px-1 md:px-6 py-3'>{profit.sales}</td>
                         <td className='px-1 md:px-6 py-3'>{profit.expenses}</td>
                         <td className='px-1 md:px-6 py-3'>{profit.profit}</td>
                      </tr>
                    })
                  ): <tr>
                  <td colSpan="5" className="text-center py-3">Loading...</td>
                </tr>
                }
              </tbody>
             </table>
            </div>
              </div>
          )
        }

        {
          dataStyle === "lineGraph" && income && income.profitData &&(
<div className="mb-5">
          <h2 className="text-xl font-semibold text-amber-900 mb-10">
            Line graph of income:
          </h2>
          {income && income.profitData ? (
            <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={600}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
              <Line type="monotone" dataKey="profit" stroke="#ff7300" />
            </LineChart>
            </ResponsiveContainer>
          ) : (
            "Loading..."
          )}
        </div>
          )
        }
        
{
  dataStyle === "barGraph" && income && income.profitData &&(
<div className='mt-10'>
<h2 className="text-xl font-semibold text-amber-900 mb-10">
            Bar graph of income:
          </h2>
      {income && income.profitData ? (
        <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
          <Bar dataKey="expenses" fill="#82ca9d" />
          <Bar dataKey="profit" fill="#ff7300" />
        </BarChart>
        </ResponsiveContainer>
      ) : "Loading..."}
    </div>
  )
}
        
      </div>
    </div>
  );
}

export default Dashboard;
