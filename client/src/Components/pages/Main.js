import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom';

import Nav from '../Nav';

const Main = ({children}) => {
    const navigate=useNavigate();
    
    const [navtoggle,setnavtoggle]=useState(false);
    const [currentuser,setcurrentuser]=useState(() => {
        // getting stored value
        const saved =  localStorage.getItem('e-app-users');
        const initialValue = JSON.parse(saved);
        return initialValue || "";
      });
      useEffect(()=>{
        if(!localStorage.getItem("e-app-users"))
          {
          navigate("/");
          }
      })
      return (
        <div className=' bg-white min-h-screen flex'>
          <Nav/>
          <div className=' bg-  text-black bg-white flex-grow mt-3 mr-4 mb-4 rounded-xl overflow-y-auto'> {children}</div>
        </div>
      );
};

export default Main