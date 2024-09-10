import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { RxCrossCircled } from "react-icons/rx";

function AddMenu() {

  const [loading, setLoading] = useState(false)
  const [deleteMenu, setDeleteMenu] = useState(false)
  const [menuItems, setMenuItems] = useState([])
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

  useEffect(()=>{
   axios.get(`https://himalayanjava-server.onrender.com/menu`).then((res)=>{
    setMenuItems(res.data.menus)
   })
  },[])

  function removeMenu(menuName){
    axios
    .delete(`https://himalayanjava-server.onrender.com/deletemenu/${menuName}`)
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
      <button type='submit' disabled={loading} className="disabled:bg-[#dad7d3] disabled:cursor-no-drop bg-[#D8C3A5] text-amber-900 px-3 py-2 text-[16px] rounded-lg">
        Add Item
      </button>
    </form>
    <div className='my-2 md:px-40'><button className='text-white px-3 py-2 text-[16px] rounded-lg bg-red-700' onClick={()=>{
      setDeleteMenu(!deleteMenu)
    }}>Click here to delete menus</button>
    <table className={`${deleteMenu ? "block" : "hidden"} my-5 text-[12px] font-serif`}>
      <thead>
        <tr>
          <th className='w-40 py-3'>S.N</th>
          <th className='w-40 py-3'>Menu</th>
          <th className='w-40 py-3'>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          menuItems.map((item,index)=>{
            return <tr key={index}>
            <td className='w-40 pl-8'>{index+1}</td>
            <td className='w-40'>{item.menuName}</td>
            <td className='w-40 pl-10 relative group cursor-pointer'><RxCrossCircled onClick={()=>removeMenu(item.menuName)}/>
            <div className="absolute right-5 w-[100px] top-full mt-1 hidden group-hover:block bg-black text-white text-xs p-2 rounded">
                          Remove this menu
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

export default AddMenu
