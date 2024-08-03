import React from 'react'
import {Link} from 'react-router-dom'
import "./catstyle.css"
const TrendingBox = ({Images,_id,Product_name,delete_tpro}) => {
    const handleDelete = (e) => {
        delete_tpro(e, _id);
    };
    return (
        <div className='text-center p-10 flex items-center align-middle flex-col gap-1'>
        <Link className=' bg-white rounded-xl relative bg-transparent h-[250px] w-[320px] text-xl transition-all ease-in-out duration-300 flex justify-center items-center overflow-hidden'>
            <img className='rounded-xl w-full h-full object-center object-contain   z-0' src={Images[0]} />
            <div className='absolute rounded-xl bg-black inset-0 opacity-0 hover:opacity-60 transition-opacity ease-in-out duration-300 z-10'></div>
            <button onClick={(e)=>handleDelete(e)} className='  h-fit absolute top-3 right-3 hover:text-black text-white font-bold text-xl md:text-2xl z-10 transition-all ease-in-out duration-700 link-hover-bottom'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-9">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>

            </button>
        </Link>
    </div>
      )
}

export default TrendingBox