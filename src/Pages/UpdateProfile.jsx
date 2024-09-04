import React from "react";

function UpdateProfile() {
  return (
    <div className="md:px-10 pb-5">
      <h2 className="md:text-center text-2xl text-amber-900 font-semibold my-5">
        Update Profile
      </h2>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-[40%]">
          <img src="../user.png" alt="" className="w-36 h-36" />
          <h2 className="text-center text-lg w-36">User01</h2>
        </div>
        <div className="w-full md:w-[55%]">
        <form className="w-full">
      <label htmlFor="name">
        Username*
      </label>
      <input
        className="p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm rounded-md"
        id="name"
        name="name"
        type="text"
        required
      />
      <label htmlFor="price">
        Email*
      </label>
      <input
        className="p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm rounded-md"
        name="price"
        type="text"
        min={0}
        id="price"
        required
      />
      <label htmlFor="price">
        Password*
      </label>
      <input
        className="p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm rounded-md"
        name="price"
        type="text"
        min={0}
        id="price"
        required
      />
      <label htmlFor="price">
        Business name*
      </label>
      <input
        className="p-2 w-full border-[1px] border-[#C2C5E1] h-8 text-sm rounded-md"
        name="price"
        type="text"
        min={0}
        id="price"
        required
      />
      <label htmlFor="image">
        Profile Picture
      </label>
      <input
        className="p-2 w-full border-[1px] border-[#C2C5E1] text-sm rounded-md"
        name="image"
        type="file"
        id="image"
      />
      <button className="bg-[#D8C3A5] text-amber-900 px-3 py-2 mt-5 text-[16px] rounded-lg">
        Save data
      </button>
    </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
