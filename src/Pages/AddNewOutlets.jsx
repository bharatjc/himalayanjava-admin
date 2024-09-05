import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNewOutlets() {

  const [loading, setLoading] = useState(false)
  const [outletdata, setOutletData] = useState({
    location: "",
    special: "",
    image:null
  })
  const [formErrors, setFormErrors] = useState([]);

  function handleChange(e){
    const {name, value, files} = e.target;
    if (name === "image") {
      setOutletData({ ...outletdata, image: files[0] });
    } else {
      setOutletData({ ...outletdata, [name]: value });
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    setLoading(true);
    const formData = new FormData();
    formData.append('location', outletdata.location);
    formData.append('special', outletdata.special);
    if (outletdata.image) {
      formData.append('image', outletdata.image);
    }
    axios
      .post(`https://himalayanjava-server.onrender.com/outlet`, formData,
      {headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },}
    )
      .then((res) => {
        toast("New outlet added successfully!", { autoClose: 2000 });
        setOutletData({
          location: "",
          special: "",
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

  return (
    <div>
    <h2 className="md:text-center text-2xl text-amber-900 font-semibold my-5">
          Add new outlet
          </h2>
          <form onSubmit={handleSubmit} className="mt-10 text-lg md:px-40">
    <label htmlFor="location" className="font-semibold">
      Location*
    </label>
    <input
      className="mb-5 p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm"
      id="location"
      name="location"
      type="text"
      required
      value={outletdata.location}
      onChange={handleChange}
    />
    <label htmlFor="special" className="font-semibold">
      Special
    </label>
    <input
      className="mb-5 p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm"
      name="special"
      type="text"
      id="special"
      value={outletdata.special}
      onChange={handleChange}
    />
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
    <button disabled={loading} className="disabled:bg-[#dad7d3] disabled:cursor-no-drop bg-[#D8C3A5] text-amber-900 px-3 py-2 mt-5 text-[16px] rounded-lg">
      Add Location
    </button>
  </form>
  </div>
  )
}

export default AddNewOutlets
