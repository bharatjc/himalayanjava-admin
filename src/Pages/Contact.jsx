import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Contact() {

  const [siteViewers, setSiteViewers] = useState([])
  useEffect(()=>{
axios.get(`https://himalayanjava-server.onrender.com/viewer`).then((res)=>{
  setSiteViewers(res.data)
})
  },[])
  return (
    <div className="mb-10">
      <h2 className="text-center text-2xl text-amber-900 font-semibold my-5">
        Messages from Viewers
      </h2>
      
        {
        siteViewers.map((siteViewer,index)=>{
          return <div key={index} className='md:mx-10  my-5 text-sm'>
             <h1><span className='text-lg font-semibold text-black'>Name of viewer :  </span> {siteViewer.name}</h1>
             <h1><span className='text-lg font-semibold text-black'>Subject :  </span> {siteViewer.subject}</h1>
             <h1><span className='text-lg font-semibold text-black'>Email :  </span> {siteViewer.email}</h1>
             <h1><span className='text-lg font-semibold text-black'>Phone no :  </span> {siteViewer.phone}</h1>
             <h1><span className='text-lg font-semibold text-black'>Message :  </span> {siteViewer.message}</h1>
          </div>
        })
        }
      
      </div>
  )
}

export default Contact
