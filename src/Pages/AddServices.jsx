import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RxCrossCircled } from "react-icons/rx";

function AddServices() {

  const [loading, setLoading] = useState(false)
  const [deleteService, setDeleteService] = useState(false)
  const [serviceItems, setServiceItems] = useState([])
  const [servicedata, setServiceData] = useState({
    title: "",
    description: "",
    image:null
  })
  const [formErrors, setFormErrors] = useState([]);

  function handleChange(e){
    const {name, value, files} = e.target;
    if (name === "image") {
      setServiceData({ ...servicedata, image: files[0] });
    } else {
      setServiceData({ ...servicedata, [name]: value });
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    setLoading(true);
    const formData = new FormData();
    formData.append('title', servicedata.title);
    formData.append('description', servicedata.description);
    if (servicedata.image) {
      formData.append('image', servicedata.image);
    }
    axios
      .post(`https://himalayanjava-server.onrender.com/service`, formData,
      {headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },}
    )
      .then((res) => {
        toast("Service registered successfully!", { autoClose: 2000 });
        setServiceData({
          title: "",
          description: "",
          image: null
        })
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

  useEffect(()=>{
    axios.get(`https://himalayanjava-server.onrender.com/service`).then((res)=>{
     setServiceItems(res.data.services)
    })
   },[])
 
   function removeService(title){
     axios
     .delete(`https://himalayanjava-server.onrender.com/deleteservice/${title}`)
     .then((res) => {
       toast(`Menu deleted successfully`, { autoClose: 2000 });
     })
     .catch((err) => {
       console.error("Error:", err);
     });
   }

  return (
    <div>
      <h2 className="md:text-center text-2xl text-amber-900 font-semibold my-5">
            Add new service
            </h2>
            <form onSubmit={handleSubmit} className="mt-10 text-lg md:px-40">
      <label htmlFor="title" className="font-semibold">
        Title*
      </label>
      <input
        className="mb-5 p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm"
        id="title"
        name="title"
        type="text"
        required
        value={servicedata.title}
        onChange={handleChange}
      />
      <p className="text-[12px] text-red-500">
                  {formErrors.find(error => error.field === "title")?.message}
                </p>
      <label htmlFor="description" className="font-semibold">
        Description*
      </label>
      <input
        className="mb-5 p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm"
        name="description"
        type="text"
        id="description"
        required
        value={servicedata.description}
        onChange={handleChange}
      />
      <p className="text-[12px] text-red-500">
                  {formErrors.find(error => error.field === "description")?.message}
                </p>
      <label htmlFor="image" className="font-semibold">
        Image
      </label>
      <input
        className="mb-5 p-2 w-full border-[1px] border-[#C2C5E1] text-sm"
        name="image"
        type="file"
        id="image"
        onChange={handleChange}
      />
      <button type='submit' disabled={loading} className="disabled:bg-[#dad7d3] disabled:cursor-no-drop bg-[#D8C3A5] text-amber-900 px-3 py-2 text-[16px] rounded-lg">
        Add Service
      </button>
    </form>

    <div className='my-2 md:px-40'><button className='text-white px-3 py-2 text-[16px] rounded-lg bg-red-700' onClick={()=>{
      setDeleteService(!deleteService)
    }}>Click here to delete services</button>
    <table className={`${deleteService ? "block" : "hidden"} my-5 text-[12px] font-serif`}>
      <thead>
        <tr>
          <th className='w-40 py-3'>S.N</th>
          <th className='w-40 py-3'>Service</th>
          <th className='w-40 py-3'>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          serviceItems.map((item,index)=>{
            return <tr key={index}>
            <td className='w-40 pl-8'>{index+1}</td>
            <td className='w-40'>{item.title}</td>
            <td className='w-40 pl-10 relative group cursor-pointer'><RxCrossCircled onClick={()=>removeService(item.title)}/>
            <div className="absolute right-5 w-[100px] top-full mt-1 hidden group-hover:block bg-black text-white text-xs p-2 rounded">
                          Remove this service
                        </div>
            </td>
            </tr>
          })
        }
      </tbody>
    </table>
    </div>
    </div>
  )
}

export default AddServices
