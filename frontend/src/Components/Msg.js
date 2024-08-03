import React,{useContext, useEffect, useState} from 'react'
import { cartcontext } from '../Components/CartContext'
import Header from '../Components/Header'
import {useNavigate,useLocation} from 'react-router-dom'
const Msg = () => {
  const location = useLocation();
  const {emptycart}=useContext(cartcontext);
  const [msg,setmsg]=useState();
  useEffect(()=>{
   emptycart();
   const params = new URLSearchParams(location.search);
                  const isSuccess = params.get('success');
                 
                 
                  if (isSuccess === 'true' ) {
                    
                 setmsg("order is placed Successfully")
                   

                }
                else{
                  setmsg("there is some error in payment try again or email us")
                }
  },[])
  return (
    <div className=' h-[100vh]'>
      <Header/>
      <div className='w-full flex justify-center mt-32 h-[40vh] '>
      <div className='  w-[50vw] bg-white rounded-xl flex justify-center align-middle items-center text-4xl font-bold   text-black'>
       {msg}
      </div>
      </div>
      
    </div>
  )
}

export default Msg