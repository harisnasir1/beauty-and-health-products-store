import React from 'react'
import {Link} from 'react-router-dom'
import "./catstyle.css"
const TrendingBox = ({Images,Product_name,_id}) => {
    return (
        <div className='text-center p-10 flex items-center align-middle flex-col gap-1'>
        <Link  to={`/Detail/${_id}`}  className=' bg-white rounded-xl relative bg-transparent h-[250px] w-[320px] text-xl transition-all ease-in-out duration-300 flex justify-center items-center overflow-hidden'>
            <img className='rounded-xl w-full h-full object-center object-contain   z-0' src={Images[0]} />
            <div className='absolute rounded-xl bg-black inset-0 opacity-0 hover:opacity-60 transition-opacity ease-in-out duration-300 z-10'></div>
            <div className='absolute bottom-[-190px] text-white font-bold text-xl md:text-2xl z-30 transition-all ease-in-out duration-700 link-hover-bottom'>
                {Product_name}
            </div>
        </Link>
    </div>
      )
}

export default TrendingBox