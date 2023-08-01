import React from 'react'

export const Search = () => {
  return (
    <div className='flex justify-center items-center  '>
      <div className=' p-3'>
      <input type="text" name="search" id="search"  className='bg-none bg-searchColor rounded-s-full p-3'/>
      <button className='bg-yellow py-3 px-5 rounded-e-full font-bold capitalize'>search</button>
      </div>
    </div>
  )
}
