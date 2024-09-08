import React, { useEffect, useState } from "react";
import axios from 'axios'
import { BsInfoCircleFill } from "react-icons/bs";

function CustomerInfo() {

 const [customerData, setCustomerData] = useState([])
  
  useEffect(()=>{
    axios.get(`https://himalayanjava-server.onrender.com/customer`).then((res)=>{
      setCustomerData(res.data)
    })
  },[])
  return (
    <div className="md:text-center mb-10">
      <h2 className="text-2xl text-amber-900 font-semibold my-5">
        Customer's Info
      </h2>
      <div className="shadow-md sm:rounded-lg mt-10 overflow-y-hidden">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

      <thead className="text-xs text-amber-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="text-[10px] px-2 md:px-6 py-3">
                S.N.
              </th>
                <th scope="col" className="text-[10px] px-1 md:px-6 py-3">
                    Customer's name
                </th>
                <th scope="col" className="text-[10px] px-1 md:px-6 py-3">
                    Profession
                </th>
                <th scope="col" className="text-[10px] px-1 md:px-6 py-3">
                    Ratings
                </th>
            </tr>
        </thead>

        <tbody>
            {
              customerData.map((customer,index)=>{
                return <tr key={customer._id} className="px-2">
                  <td className='px-1 md:px-6 py-3'>{index+1}</td>
                  <td className='px-1 md:px-6 py-3'>{customer.name}</td>
                  <td className='px-1 md:px-6 py-3'>{(customer.profession)?(customer.profession):"N/A"}</td>
                  <td className='px-1 md:px-6 py-3'>{customer.rating}</td>
                </tr>
              })
            }
        </tbody>

        </table>
      </div>
    </div>
  );
}

export default CustomerInfo;
