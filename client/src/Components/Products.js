import React,{useEffect} from 'react'
import Table from './Table'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Getproducts} from '../Utils/ApiRoutes'

const Products = () => {
  
  const navigate=useNavigate();
useEffect(()=>{
  if(!localStorage.getItem('e-app-users'))
    {
      navigate('/');
    }
 axios.get(Getproducts)
 .then((res)=>console.log("products we get from mongo: ",res))
 .catch((e)=>console.log("error is " ,{e}))
},[])
  
  return (
    <div className='flex flex-col  align-baseline items-center w-full h-full'>
     <div className='text-white  w-full flex-grow' style={{flexBasis: '15%'}}>
       <div className=' flex items-center justify-items-center w-full h-full'>
        <button className='bg-black ml-9 text-lg p-3 rounded-2xl shadow-lg shadow-black ' onClick={()=>navigate('/AddProduct')} >+ Products</button>

       </div>
      
     </div>
     <div className='text-white  w-full flex-grow' style={{flexBasis: '85%'}}>
      
      <Table/>
     </div>
    </div>
  )
}

export default Products