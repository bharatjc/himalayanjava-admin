import React from 'react'

function AddMenu() {
  return (
    <div>
      <h2 className="md:text-center text-2xl text-amber-900 font-semibold my-5">
            Add new menu
            </h2>
            <form className="mt-10 text-lg md:px-40">
      <label htmlFor="name" className="font-semibold">
        Name*
      </label>
      <input
        className="mb-5 p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm"
        id="name"
        name="name"
        type="text"
        required
      />
      <label htmlFor="price" className="font-semibold">
        Price*
      </label>
      <input
        className="mb-5 p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm"
        name="price"
        type="number"
        min={0}
        id="price"
        required
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
        Add Item
      </button>
    </form>
    </div>
  )
}

export default AddMenu
