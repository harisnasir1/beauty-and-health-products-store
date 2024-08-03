import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Table from '../Components/Properties_table'
import {edit_Properties,Add_Properties,del_Properties,Getall_properties,get_property} from '../Utils/ApiRoutes'
const Properties = () => {

    const [name,setname]=useState("");
    const [parameter,SetParameter]=useState("");
    const [editing,setediting]=useState(false);
    const [updateid,setupdateid]=useState();
 
   useEffect(()=>{
     axios.get(Getall_properties);
   },[])
    const handelSubmit=async(e)=>{
      e.preventDefault();
      const re=await axios.post(Add_Properties,{
        name,
        parameter
      });
      console.log(re);
      setname("")
      SetParameter("");
    }
    const update=async(id)=>{
      console.log("comming here", id);
      setediting(true);
      setupdateid(id);
     const re=await axios.post(get_property,{
        id
      });
      setname(re.data.allproducts.name);
      SetParameter(re.data.allproducts.parameter)
     
    }
  
    const handelupdate=async(e)=>{
     e.preventDefault();
     const re=await axios.post(edit_Properties,{
      name,
      parameter,
      id:updateid,
     });
      setname("");
      SetParameter("");
      setediting("");
      setupdateid("");
    }

   

  return (
    <div className='flex flex-col  align-baseline items-center w-full h-full'>
{
    !!editing?
      <div className='text-white w-full flex-grow pt-8 p-12' style={{flexBasis: '30%'}}>
          <div>
            <h1 className=' text-custom-gray text-3xl font-bold mb-4'>Add  Properties  </h1>
          </div>

       <form className='flex justify-around  ' onSubmit={handelupdate} >


          <div className=' flex flex-col gap-4'>
        <label className=' text-2xl text-custom-gray font-bold capitalize'>property name</label>
         <input className=' text-black  font-bold rounded p-2 w-[20vw]
          border-2 border-gray  outline-none'  placeholder='enter property' value={name} onChange={(e)=>{
            e.preventDefault();
            setname(e.target.value)
          }}/>
        </div>

        <div className=' flex flex-col gap-4'>
        <label className=' text-2xl text-custom-gray font-bold capitalize'>property parameters</label>
         <input className=' text-black  font-bold rounded p-2 w-[20vw]
       border-2 border-gray  outline-none' placeholder='values seperated by comma ,' value={parameter} onChange={(e)=>{
        e.preventDefault();
        SetParameter(e.target.value)
      }}/>
        </div>







    <button type='submit' className='bg-custom-gray h-12 items-center w-fit text-xl  text-white rounded-xl cursor-pointer p-2 pr-4 pl-4   mt-12 capitalize'>Update</button>
    </form>
         

      </div>
:
<div className='text-white w-full flex-grow pt-8 p-12' style={{flexBasis: '30%'}}>
<div>
  <h1 className=' text-custom-gray text-3xl font-bold mb-4'>Add  Properties  </h1>
</div>

<form className='flex justify-around  ' onSubmit={handelSubmit} >


<div className=' flex flex-col gap-4'>
<label className=' text-2xl text-custom-gray font-bold capitalize'>property name</label>
<input className=' text-black  font-bold rounded p-2 w-[20vw]
border-2 border-gray  outline-none'  placeholder='enter property' value={name} onChange={(e)=>{
  e.preventDefault();
  setname(e.target.value)
}}/>
</div>

<div className=' flex flex-col gap-4'>
<label className=' text-2xl text-custom-gray font-bold capitalize'>property parameters</label>
<input className=' text-black  font-bold rounded p-2 w-[20vw]
border-2 border-gray  outline-none' placeholder='values seperated by comma ,' value={parameter} onChange={(e)=>{
e.preventDefault();
SetParameter(e.target.value)
}}/>
</div>







<button type='submit' className='bg-custom-gray h-12 items-center w-fit text-xl  text-white rounded-xl cursor-pointer p-2 pr-4 pl-4   mt-12 capitalize'>Add</button>
</form>


</div>

      }
      <div className='text-white w-full flex-grow pt-8 p-12' style={{flexBasis: '70%'}}>
     <Table name={name} update={update} />
      </div>







       
        
    </div>
  )
}


export default Properties