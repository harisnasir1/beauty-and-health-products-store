import React,{useEffect,useState,useContext} from 'react'
import Iphone from '../Utils/img/iphone.jpg'
import {Link} from 'react-router-dom'
import {Getproducts, get_product,Getfeaturedproducts} from '../Utils/apiroutes'
import {cartcontext} from './CartContext'
import axios from 'axios'
import first from '../Utils/img/1.jpg'
import second from '../Utils/img/2.jpg'
import third from '../Utils/img/3.jpg'

const Featured = () => {
 
const [current,setcurrent]=useState(0);

 const array=[first,second,third];
  
  

 
  return (
    <div className=' w-full h-fit lg:h-[70vh] md:h-[60vh] flex justify-center    text-white  '>
      
        <img src={third} className=' bg-contain  h-full w-[80vw] mt-5'/>
       
    </div>
  )
}

export default Featured