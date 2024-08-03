import React,{useEffect,useState,useContext} from 'react'
import Iphone from '../Utils/img/iphone.jpg'
import {Link} from 'react-router-dom'
import {Getproducts, get_product,Getfeaturedproducts} from '../Utils/apiroutes'
import {cartcontext} from './CartContext'
import axios from 'axios'

const Mid_Banner = ({Product_name ,
  Images,
  product_descripton,
  _id}) => {
    const {addproducts}= useContext(cartcontext);

    
   

  
    const Add_featured_product_to_cart=()=>{
     _id&& addproducts(_id);
    }
  
  
    return (
      <div className=' w-full bg-forange h-fit lg:h-[50vh] md:h-[40vh]   grid lg:grid-cols-2 md:grid-cols-2 grid-rows-2  text-white  '>
          
          <div className='  w-full h-fit md:h-[40vh] lg:h-[50vh]    order-2 lg:order-1   justify-center items-center lg:text-end md:text-end   flex flex-col lg:gap-12 gap-5 text-center pb-4 '>
             <div className=' lg:text-5xl md:text-5xl text-center  text-3xl font-bold font-sans capitalize'>
               {Product_name?Product_name:""}
             </div>
             <div className=' lg:text-left md:text-left text-center  w-[92%]  lg:w-[40vw]  lg:text-lg sm:text-sm  font-sans flex items-left lg:leading-7 sm:leading-3'>
             {product_descripton?product_descripton:""}
  
             </div>
             <div className=' flex text-white gap-6  '>
              <div className=' flex '>   
                  
                     <Link to={`Detail/${_id}`} className=' p-2'>    
                     <button className=' bg-transparent p-2 rounded-lg lg:text-md sm:text-sm font-sans font-bold cursor-pointer border-2 border-white'>View more</button></Link> 
                 </div>
  
                 <div>
                 <button className=' bg-custom-white text-black p-3 rounded-lg lg:text-2xl md:text-2xl text-base font-sans lg:font-bold cursor-pointer flex gap-3'
                 onClick={Add_featured_product_to_cart}
                 >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" >
                 <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                 </svg>
  
                  Add to cart</button>
                 </div>
  
            
             </div>
          </div>
          <div  className='  order-1 lg:order-2 md:h-[35vh]  lg:h-[50vh] h-[26vh] p-0   :w-full overflow-hidden flex justify-center items-end lg:items-center mt-9 lg:m-0 md:m-0  '>
              <img className=' w-full h-full  object-contain'  src={Images?Images[0]:""}/>
          </div>
  
      </div>
    )
  }

export default Mid_Banner