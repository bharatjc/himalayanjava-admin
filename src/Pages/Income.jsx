import React from 'react'

function Income() {
  return (
    <div>
    <h2 className="md:text-center text-2xl text-amber-900 font-semibold my-5">
          Today's Income
          </h2>
          <form className="mt-10 text-lg md:px-40">
    <label htmlFor="name" className="font-semibold">
      Total sale*
    </label>
    <input
      className="mb-2 p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm"
      id="name"
      name="name"
      type="number"
      required
    />
    <label htmlFor="price" className="font-semibold">
      Expenditure*
    </label>
    <input
      className="mb-8 p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm"
      name="price"
      type="number"
      min={0}
      id="price"
      required
    />
    <button className="bg-[#D8C3A5] text-amber-900 px-3 py-2 text-[16px] rounded-lg">
      Calculate Profit
    </button>
  </form>
  </div>
  )
}

export default Income
