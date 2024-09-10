import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Income() {
  const [loading, setLoading] = useState(false)
  const [profit, setProfit] = useState([])
  const [formErrors, setFormErrors] = useState([]);
 const [incomeData, setIncomeDta] = useState({
  sales: 0,
  expenses: 0
 })

 function handleChange(e){
  const {name,value} = e.target
  setIncomeDta({ ...incomeData, [name]: value });
 }

 function handleSubmit(e){
  e.preventDefault()
  setLoading(true)
  axios.post(`https://himalayanjava-server.onrender.com/income`,{
    sales:incomeData.sales,
    expenses:incomeData.expenses
  }).then((res)=>{
    toast("Profit calculated!", { autoClose: 2000 });
    setProfit(res.data)
  }) .catch((err) => {
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
    <div>
    <h2 className="md:text-center text-2xl text-amber-900 font-semibold my-5">
          Today's Income
          </h2>
          <form onSubmit={handleSubmit} className="mt-10 text-lg md:px-40">
    <label htmlFor="sales" className="font-semibold">
      Total sale*
    </label>
    <input
      className="mb-2 p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm"
      id="sales"
      name="sales"
      type="number"
      required
      value={incomeData.sales}
      onChange={handleChange}
    />
    <p className="text-[12px] text-red-500">
                  {formErrors.find(error => error.field === "sales")?.message}
                </p>
    <label htmlFor="expenses" className="font-semibold">
      Expenditure*
    </label>
    <input
      className="mb-2 p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm"
      name="expenses"
      type="number"
      id="expenses"
      required
      value={incomeData.expenses}
      onChange={handleChange}
    />
    <p className="text-[12px] text-red-500">
                  {formErrors.find(error => error.field === "expenses")?.message}
                </p>
    <button className="disabled:bg-[#dad7d3] disabled:cursor-no-drop bg-[#D8C3A5] text-amber-900 px-3 py-2 text-[16px] rounded-lg">
      Calculate Profit
    </button>
  </form>
  <div>
    <h2 className='text-amber-900 my-10 text-xl font-semibold md:text-center'>Today's profit : &nbsp;
      {
        profit ? profit.profit : "..."
      }
       </h2>
  </div>
  </div>
  )
}

export default Income
