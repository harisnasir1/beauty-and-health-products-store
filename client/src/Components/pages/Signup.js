import React,{useState,useEffect} from 'react';

import {Link,useNavigate,navigate} from 'react-router-dom';

import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios'
import {SignupRoute} from '../../Utils/ApiRoutes';

const Signup = () => {
  const navigate=useNavigate();
  const [values,setValue]=useState({
    UserName:"",
    Email:"",
    Password:"",
    ConfirmPassword:""
  })

  const handleSubmit=async(event)=>{
     event.preventDefault();
    
    if (handleValidation()){
      const{UserName,Email,Password}=values;
      const {data}= await axios.post(SignupRoute,{
        UserName,
        Email,
        Password,
      });
      console.log(data);
      if(data.status===false)
      {
        toast(data.msg);
      }
      if(data.status===true)
      {
      localStorage.setItem("e-app-users",JSON.stringify(data.user));
      navigate("/");
      }
    }

  }
  const handleChange=(event)=>{
   setValue({...values,[event.target.name]:event.target.value})
      }
    
   const handleValidation=()=>{
    const{UserName,Email,Password,ConfirmPassword}=values;
    console.log( ConfirmPassword)
    if(Password!=ConfirmPassword)

    {
      toast.error("password and confirm password should be same!")
      return false;
    }else if(UserName.length<3)
    {
      toast.error("UserName Length Should be greater then 3 Characters!")
      return false;
    }
    else if(Password.length<8)
    {
      toast.error("password should be equal or greater then 8 Characters!")
      return false;
    }
    
    else{
      return true;
    }
   }
  
  return (
 <>
    <div className=' bg-custom-gray w-[100vw] h-[100vh] flex justify-center items-center'>
      <div className='w-[54vw] h-[73vh] bg-custom-black rounded-lg flex flex-col justify-center items-center'>
      
       <form className='w-[54vw] h-[73vh] bg-black rounded-xl flex flex-col justify-center text-center align-middle items-center' onSubmit={(event)=>handleSubmit(event)}>
       <div className=" w-80 text-custom-lighblue text-nowrap capitalize tracking-wider text-3xl text-center flex flex-col gap-5  ">
       <h1>Login</h1>
       <h1>Admin Panel</h1>
       </div>
       <div className='flex flex-col gap-7 justify-evenly w-[25vw] h-[46vh] '>
         <input type="text"  placeholder='UserName' name='UserName' onChange={(e)=>handleChange(e)} required={true}
       className='leading-5  text-center text-white text-xl bg-transparent border-b-2 border-b-custom-lighblue border-solid
        border-custom-lighblue focus:border-transparent p-2 rounded-lg' />


       <input type="Email" placeholder='Email' name='Email' onChange={(e)=>handleChange(e)}required={true}
          className='leading-5  text-center text-white text-xl bg-transparent border-b-2 border-b-custom-lighblue
          focus:border-transparent p-2 rounded-lg' />


           <input type="password" placeholder='Password' name='Password' onChange={(e)=>handleChange(e)}required={true}
          className='leading-5  text-center text-white text-xl bg-transparent border-b-2 border-b-custom-lighblue
          focus:border-transparent p-2 rounded-lg' />


           <input type="password" placeholder='Confirm Password' name='Confirm Password' onChange={(e)=>handleChange(e)}required={true}
          className='leading-5  text-center text-white text-xl bg-transparent border-b-2 border-b-custom-lighblue
          focus:border-transparent p-2 rounded-lg' />
          
       <button type='submit' className='text-white text-xl '>Login</button>
     </div>
     
     <span className='text-white text-lg  flex justify-center text-center'>Already  have an account  ?      <Link className='text-custom-lighblue text-2xl pl-3' to="/ ">   Login</Link></span>
   
       </form>
      </div>
    </div>
    <ToastContainer draggable={true} position={'bottom-right'} autoClose={8000} theme='dark' pauseOnHover={false}/>
    </>
  )
}

export default Signup