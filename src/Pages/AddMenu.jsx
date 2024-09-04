import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function AddMenu() {

  const [loading, setLoading] = useState(false)
  const [menudata, setMenuData] = useState({
    menuName: "",
    menuPrice: "",
    image:null
  })
  const [formErrors, setFormErrors] = useState([]);

  function handleChange(e){
    const {name, value, files} = e.target;
    if (name === "image") {
      setMenuData({ ...menudata, image: files[0] });
    } else {
      setMenuData({ ...menudata, [name]: value });
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    setLoading(true);
    const formData = new FormData();
    formData.append('menuName', menudata.menuName);
    formData.append('menuPrice', menudata.menuPrice);
    if (menudata.image) {
      formData.append('image', menudata.image);
    }
    axios
      .post(`https://himalayanjava-server.onrender.com/menu`, formData,
      {headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },}
    )
      .then((res) => {
        toast("Menu added successfully!", { autoClose: 2000 });
        setMenuData({
          menuName: "",
          menuPrice: "",
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
            Add new menu
            </h2>
            <form onSubmit={handleSubmit} className="mt-10 text-lg md:px-40">
      <label htmlFor="menuName" className="font-semibold">
        Name*
      </label>
      <input
        className="mb-5 p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm"
        id="menuName"
        name="menuName"
        type="text"
        required
        value={menudata.menuName}
        onChange={handleChange}
      />
      <label htmlFor="menuPrice" className="font-semibold">
        Price*
      </label>
      <input
        className="mb-5 p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm"
        name="menuPrice"
        type="number"
        id="menuPrice"
        required
        value={menudata.menuPrice}
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
        Add Item
      </button>
    </form>
    </div>
  )
}

export default AddMenu
