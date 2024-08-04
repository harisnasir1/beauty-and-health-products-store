import React from 'react'
import {Link} from 'react-router-dom'
import "./catstyle.css"
const CategoryBox = ({Img,Catergoy_name,_id}) => {
  return (
    <div className='text-center p-5 flex items-center align-middle flex-col gap-1'>
    <Link  to={`/Categories_products/${Catergoy_name}`} className=' relative bg-transparent h-[280px] w-[350px] text-xl transition-all ease-in-out duration-300 flex justify-center items-center overflow-hidden'>
        <img className='rounded-xl w-[80%] md:w-full h-[80%] md:h-full object-center object-cover   z-0' src={Img} />
        <div className='absolute rounded-xl bg-black inset-0 opacity-0 hover:opacity-20 transition-opacity ease-in-out duration-300 z-10'></div>
        <div className='absolute bottom-[-90px] text-white font-bold text-xl md:text-4xl z-30 transition-all ease-in-out duration-700 link-hover-bottom'>
            {Catergoy_name}
        </div>
    </Link>
</div>
  )
}

export default CategoryBox
