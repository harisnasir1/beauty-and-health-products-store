import React,{useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';

import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import {LoginRoute} from '../../Utils/ApiRoutes';
const Login = () => {
  const navigate=useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("e-app-users"))
    {
      navigate("/");
    }
  
  },[])
  const handleValidation=()=>{
    const{UserName,Password}=values;
    if(Password==="")
    {
      toast.error("Email and Password are Required!")
      return false;
    }
    else if(UserName.length==="")
    {
      toast.error("Email and Password are Required!")
      return false;
    }    
    else{
      return true;
    }
   }

  const [values,setValue]=useState({
    UserName:"",
    Password:"",
  })
  const handleSubmit=async(event)=>{
    event.preventDefault();
   
   if (handleValidation()){
     const{UserName,Password}=values;
     const {data}= await axios.post(LoginRoute,{
       UserName,
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
     navigate("/Home_customization");
     }
   }

 }
  const handleChange=(event)=>{
    setValue({...values,[event.target.name]:event.target.value})
       }
  const [responseData, setResponseData] = useState(null);
  
  
  
  return (
 <>
 <div className=' bg-custom-gray overflow-hidden w-[100vw] h-[100vh] flex justify-center items-center'>
   <div className='w-[54vw] h-[63vh] overflow-hidden bg-custom-black rounded-lg flex flex-col justify-center items-center'>
   
    <form className='w-[54vw] h-[63vh] bg-black rounded-xl flex flex-col justify-center text-center align-middle items-center' onSubmit={(event)=>handleSubmit(event)}>
    <div className=" w-80 text-custom-lighblue text-nowrap capitalize tracking-wider text-3xl text-center flex flex-col gap-5  ">
    <h1 className=' text-white'>Login</h1>
    <h1>Admin Panel</h1>
    </div>
    <div className='flex flex-col gap-3 justify-evenly w-[20vw] h-[40vh]'>
      <input type="text"  placeholder='UserName' name='UserName' onChange={(e)=>handleChange(e)} required={true}
    className='leading-5  text-center text-white text-xl bg-transparent border-b-2 border-b-custom-lighblue border-solid
     border-custom-lighblue focus:border-transparent p-2 rounded-lg' />
    <input type="password" placeholder='Password' name='Password' onChange={(e)=>handleChange(e)}required={true}
       className='leading-5  text-center text-white text-xl bg-transparent border-b-2 border-b-custom-lighblue
       focus:border-transparent p-2 rounded-lg' />
    <button type='submit' className='text-white text-xl '>Login</button>
  </div>
  
  <span className='text-white text-lg  flex justify-center text-center'>Don't have an account  ?      <Link className='text-custom-lighblue text-2xl pl-3' to="/Signup ">   Register</Link></span>

    </form>
   </div>
 </div>
 <ToastContainer draggable={true} position={'bottom-right'} autoClose={8000} theme='dark' pauseOnHover={false}/>
 </>
  );
};

export default Login;
