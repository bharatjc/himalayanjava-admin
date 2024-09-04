import React from 'react'

function Help() {
  return (
    <div className='md:px-10 pb-5'>
      <h2 className="md:text-center text-2xl text-amber-900 font-semibold my-5">
      Help Center
      </h2>
      <div className='mb-5'>
        <h2 className='font-bold mb-2'>Contact Support:</h2>
        <ul className='text-sm'>
        <li>Email: support@himalayanjavacoffee.com </li>
        <li>Phone: 062-7890545</li>
      </ul>
      </div>

      <div>
        <h2 className='font-bold mb-2'>Policies:</h2>
        <ol className='text-sm'>
        <li>Return and Refund Policy</li>
        <li>Privacy Policy</li>
        <li>Terms of Service</li>
      </ol>
      </div>
      
    </div>
  )
}

export default Help
