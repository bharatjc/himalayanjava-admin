import React, { useEffect, useState } from "react";
import axios from 'axios'
import { BsInfoCircleFill } from "react-icons/bs";

function CustomerInfo() {
 const [showAll, setShowAll] = useState(false)
 const [orderData, setOrderData] = useState([])
 const [status, setStatus] = useState("pending")
  
  useEffect(()=>{
    axios.get(`https://himalayanjava-server.onrender.com/order`).then((res)=>{
      setOrderData(res.data.orders)
    })
  },[])

  function handleStatus(e){
    e.preventDefault()
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);
    console.log("Status updated successfully!", status)
  }
  return (
    <div className="md:text-center mb-10">
      <h2 className="text-2xl text-amber-900 font-semibold my-5">
        Customer's Info
      </h2>
      <div className="sm:rounded-lg mt-10 overflow-y-hidden">
      <div className="flex justify-end">
      <button className="text-amber-900 font-bold items-center gap-2 px-3 py-2 bg-[#D8C3A5] rounded-lg" onClick={()=>{
        setShowAll(!showAll)
      }}>{showAll ? 'Show Less' : 'Show All Customers'}</button>
        </div> 
{ showAll? 
  orderData.map((order,index)=>{
    return <div key={index} className="my-7 border-t-2 border-l-2 border-r-2 px-2">
     <div className="flex font-semibold border-b-2 py-3 mb-5 justify-around text-center">
     <h2>Customer no. {index+1}</h2>
     <h2>status :
      <select name="status" id="status" value={status} onChange={handleStatus} className="text-sm text-gray-500">
        <option value="pending"> pending</option>
        <option value="success"> success</option>
        <option value="pending"> fail</option>
      </select>
     </h2>
      </div>

      <div>

 <div className="flex flex-col md:flex-row justify-around mb-3 md:mb-1">
      <h2 className="font-semibold">Customer's name: <span className="text-gray-400 text-sm">{order.customer}</span></h2>
      <h2 className="font-semibold">Email: <span className="text-gray-400 text-sm">{order.email}</span></h2>
      </div>
      <div className="flex justify-around mb-3 md:mb-1 flex-col md:flex-row">
      <h2 className="font-semibold">Card no: <span className="text-gray-400 text-sm">{order.cardNo}</span></h2>
      <h2 className="font-semibold">Address: <span className="text-gray-400 text-sm">{order.city}, {order.province}</span></h2>
      </div>

      </div>
     

      <table className="border-y-2 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-2">

      <thead className="text-xs text-amber-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2">
            <tr>
              <th scope="col" className="text-[10px] px-2 md:px-6 py-3">
                S.N.
              </th>
                <th scope="col" className="text-[10px] px-1 md:px-6 py-3">
                    Product's name
                </th>
                <th scope="col" className="text-[10px] px-1 md:px-6 py-3">
                    Price
                </th>
                <th scope="col" className="hidden md:block text-[10px] px-1 md:px-6 py-3">
                    Quantity
                </th>
                <th scope="col" className="block md:hidden text-[10px] px-1 md:px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="text-[10px] px-1 md:px-6 py-3">
                    Total
                </th>
            </tr>
        </thead>

        <tbody>
            {
           order.products.map((product,index)=>{
                return <tr key={product._id} className="px-2">
                  <td className='px-1 md:px-6 py-3'>{index+1}</td>
                  <td className='px-1 md:px-6 py-3'>{product.name}</td>
                  <td className='px-1 md:px-6 py-3'>{product.price}</td>
                  <td className='px-1 md:px-6 py-3'>{product.quantity}</td>
                  <td className='px-1 md:px-6 py-3'>{product.total}</td>
                </tr>
              })
            }
        </tbody>
        </table>
        <div className="flex justify-around border-b-2">
        <h2>Total: </h2>
        <h2>{order.total}</h2>
        </div>
    </div>
  }): 

  orderData.slice(0,2).map((order,index)=>{
    return <div key={index} className="my-7 border-t-2 border-l-2 border-r-2 px-2">
       <div className="flex font-semibold border-b-2 py-3 mb-5 justify-around">
     <h2 className="">Customer no. {index+1}</h2>
     <h2>status :
     <select name="status" id="status" className="text-sm text-gray-500" value={status} onChange={handleStatus}>
        <option value="pending"> pending</option>
        <option value="success"> success</option>
        <option value="pending"> fail</option>
      </select>
     </h2>
      </div>
      <div>

 <div className="flex flex-col md:flex-row justify-around mb-3 md:mb-1">
      <h2 className="font-semibold">Customer's name: <span className="text-gray-400 text-sm">{order.customer}</span></h2>
      <h2 className="font-semibold">Email: <span className="text-gray-400 text-sm">{order.email}</span></h2>
      </div>
      <div className="flex justify-around mb-3 md:mb-1 flex-col md:flex-row">
      <h2 className="font-semibold">Card no: <span className="text-gray-400 text-sm">{order.cardNo}</span></h2>
      <h2 className="font-semibold">Address: <span className="text-gray-400 text-sm">{order.city}, {order.province}</span></h2>
      </div>

      </div>
     

      <table className="border-y-2 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-2">

      <thead className="text-xs text-amber-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2">
            <tr>
              <th scope="col" className="text-[10px] px-2 md:px-6 py-3">
                S.N.
              </th>
                <th scope="col" className="text-[10px] px-1 md:px-6 py-3">
                    Product's name
                </th>
                <th scope="col" className="text-[10px] px-1 md:px-6 py-3">
                    Price
                </th>
                <th scope="col" className="hidden md:block text-[10px] px-1 md:px-6 py-3">
                    Quantity
                </th>
                <th scope="col" className="block md:hidden text-[10px] px-1 md:px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="text-[10px] px-1 md:px-6 py-3">
                    Total
                </th>
            </tr>
        </thead>

        <tbody>
            {
           order.products.map((product,index)=>{
                return <tr key={product._id} className="px-2">
                  <td className='px-1 md:px-6 py-3'>{index+1}</td>
                  <td className='px-1 md:px-6 py-3'>{product.name}</td>
                  <td className='px-1 md:px-6 py-3'>{product.price}</td>
                  <td className='px-1 md:px-6 py-3'>{product.quantity}</td>
                  <td className='px-1 md:px-6 py-3'>{product.total}</td>
                </tr>
              })
            }
        </tbody>
        </table>
        <div className="flex justify-around border-b-2">
        <h2>Total: </h2>
        <h2>{order.total}</h2>
        </div>
    </div>
  })
}

      </div>
    </div>
  );
}

export default CustomerInfo;
