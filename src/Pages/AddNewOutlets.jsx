import React from 'react'

function AddNewOutlets() {
  return (
    <div>
    <h2 className="md:text-center text-2xl text-amber-900 font-semibold my-5">
          Add new outlet
          </h2>
          <form className="mt-10 text-lg md:px-40">
    <label htmlFor="name" className="font-semibold">
      Location*
    </label>
    <input
      className="mb-5 p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm"
      id="name"
      name="name"
      type="text"
      required
    />
    <label htmlFor="price" className="font-semibold">
      Special
    </label>
    <input
      className="mb-5 p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm"
      name="price"
      type="text"
      min={0}
      id="price"
    />
    <label htmlFor="image" className="font-semibold">
      Image
    </label>
    <input
      className="mb-5 p-2 w-full border-[1px] border-[#C2C5E1] text-sm"
      name="image"
      type="file"
      id="image"
    />
    <button className="bg-[#D8C3A5] text-amber-900 px-3 py-2 mt-5 text-[16px] rounded-lg">
      Add Location
    </button>
  </form>
  </div>
  )
}

export default AddNewOutlets
