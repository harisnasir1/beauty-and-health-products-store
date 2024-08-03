import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Table from '../Components/Categories_table'
import {Add_Categories,Getall_Categories,get_category,edit_categories,Upload_Images,del_categories,Del_cloud_Images} from '../Utils/ApiRoutes'
import { Tab } from '@mui/material';
import Spinner from '../Components/Spinner'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
const Categorise = () => {
    const [Catname,Setcatname]=useState("");
    const [ParentCat,SetparentCat]=useState("");
    const [Allcat,Setallcat]=useState([]);
    const [editing,setediting]=useState(false);
    const [updateid,setupdateid]=useState();
    const [catimg,setcatimg]=useState([]);
    const [imguploaded,setimguploaded]=useState(false);
    const[Isuploading,SetIsUploading]=useState(false);

    async function getcats()
    {
        console.log("i am here");
        axios.get(Getall_Categories)
        .then((res) => {
          console.log("data from server",res);
          Setallcat(res.data.result);
        })
        .catch((e) => console.log("error is ", { e }));
    }
    
    const getcategory=async(id)=>
    {
      console.log("it is working ",id);

      setediting(true);
      setupdateid(id);
      const r=await axios.post(get_category,{
        id
      });
      console.log(r);
      Setcatname(r.data.allproducts.Catergoy_name);
      const img=r.data.allproducts.Img;
      if(!r.data.allproducts?.parent)
        {
          console.log("we are in bussiness")
          SetparentCat("no parent Category")
        }
      if(img)
        {
          const l= {links:[r.data.allproducts.Img]}
          setcatimg(l);
          //console.log({links:[r.data.allproducts.Img]});
          
          setimguploaded(true);
        }
     
      else{
        setcatimg([]);

      }
      r.data.allproducts.parent&&SetparentCat(r.data.allproducts.parent.Catergoy_name)

    }
    
    const update=async(event)=>{
      event.preventDefault();
      console.log("k",ParentCat);
      await  axios.post(edit_categories,{
        Catergoy_name:Catname,
        P:ParentCat,
        id:updateid,
        img:!!catimg&&catimg?.links?.length>0?catimg.links[0]:null
       })
       Setcatname("");
       SetparentCat("");
       setimguploaded(false);
       setcatimg([]);

    }


    useEffect(() => {
        getcats();
      },[]);

    const handelSubmit=async(event)=>{
       
        event.preventDefault();
        console.log(Catname.length);
      await  axios.post(Add_Categories,{
        Catergoy_name:Catname,
        P:ParentCat,
        img:catimg
       })
       Setcatname("");
      SetparentCat("");
      setcatimg([]);
      getcats();
      setimguploaded(false);
      
    }
     
    const UploadImages =async(e)=>
      {
        const files=e.target?.files;
        SetIsUploading(true);
        try{
          if(files?.length>0)
            {
              const data= new FormData();
              Array.from(files).forEach(file => {
                data.append('file',file);
              });
               const res=await axios.post(Upload_Images,data,);
               console.log(res.data.links[0]);
               setcatimg(res.data);
            }
            SetIsUploading(false);
            setimguploaded(true);
        }
        catch(e)
    {
    toast("plese wait for few seconds before uploading more Images ");
    }    
      }

      const del = async (id) => {
    
        try {
          await axios.post(del_categories, { id });
           
         
        } catch (e) {
          toast.error('Error deleting category');
          console.log("error deleting product", { e });
        }
      };

      const image_del_update=async(e)=>{
        e.preventDefault();
        const url=catimg.links[0];
        console.log(url);
       await axios.post(Del_cloud_Images,{url});
       setcatimg([]);
       setimguploaded(false);
       
      }
      const image_del_sub=async(e)=>{
        e.preventDefault();
        const url=catimg.links[0];
        console.log(url);
       await axios.post(Del_cloud_Images,{url});
       setcatimg([]);
       setimguploaded(false);
       
      }

  return (
    <div className='flex flex-col  align-baseline items-center w-full h-full'>

     {   
     !!editing?
      <div className='text-white w-full flex-grow pt-8 p-12' style={{flexBasis: '30%'}}>
          <div>
            <h1 className=' text-custom-gray text-3xl font-bold mb-4'>Edit Categories </h1>
          </div>

       <form className='flex justify-around  ' onSubmit={update}>
            <div className=' flex flex-col gap-4'>
        <label className=' text-2xl text-custom-gray font-bold capitalize'>Category name</label>
         <input className=' text-black  font-bold rounded p-2 w-[20vw]
       border-2 border-gray  outline-none' value={Catname} onChange={(e)=>Setcatname(e.target.value)} />
            </div>



         <div className='  flex flex-col gap-4'>
     <label className=' text-2xl text-custom-gray font-bold capitalize'> Parent Category </label>

     <select
        className="w-[15vw] text-white bg-custom-gray outline-none focus:ring-0 border-gray-300 h-12 text-center text-bold text-lg"
        required
        value={ParentCat}
        onChange={(e)=>{
            e.preventDefault();
            SetparentCat(e.target.value);
        }}
      >
        <option className=' cursor-pointer' value={undefined}>no parent Category </option>
        {  
       
        Allcat.map((cat, index) => { return !cat.parent&& cat.Catergoy_name!==Catname&& (
          
    <option key={index} className="cursor-pointer" value={cat.Catergoy_name} >
        { cat.Catergoy_name}
    </option>
)
}
)

}
       
         </select>

         </div>

        
  <div className='  mr-4 ml-4 w-[10%]'>
   {imguploaded?
     !!catimg&&<div  className=' relative w-[150px] h-[150px]'> <img className=' w-full h-full object-contain' src={catimg.links[0]}/>
     <div className=' opacity-0 absolute top-0 w-full h-full bg-black hover:opacity-35 right-0'>
                      <button onClick={(e)=>image_del_update(e)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                      </button>
                  </div>
     </div>
      :
       
       <div className='w-full h-full flex flex-col justify-center items-center' >
       
        {
          Isuploading?
          <Spinner/>:
        <div>
        <label className=' w-28 h-28 border  flex items-center justify-center  gap-2 bg-gray-400 cursor-pointer rounded-lg'>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
      </svg>
      <span>Upload</span>


   <input type='file' className=' hidden cursor-pointer' onChange={UploadImages} />

       </label>
        </div>
        }
       </div>
  }
  </div>


    <button type='submit' className='bg-custom-gray h-12 items-center w-fit text-xl  text-white rounded-xl cursor-pointer p-2   mt-12 capitalize'>Update</button>
    </form>
         

      </div>
             : 
        <div className='text-white w-full flex-grow pt-8 p-12' style={{flexBasis: '30%'}}>
         <div>
            <h1 className=' text-custom-gray text-3xl font-bold mb-4'>Categories </h1>
          </div>

               <form className='flex  justify-around gap-20  ' onSubmit={handelSubmit}>
                    <div className=' flex flex-col gap-4'>
                <label className=' text-2xl text-custom-gray font-bold capitalize'>Category name</label>
                 <input className=' text-black  font-bold rounded p-2 w-[20vw]
               border-2 border-gray  outline-none' value={Catname} onChange={(e)=>Setcatname(e.target.value)} />
                    </div>
               
               
               
                 <div className='  flex flex-col gap-4'>
<label className=' text-2xl text-custom-gray font-bold capitalize'> Parent Category </label>

<select
 className="w-[15vw] text-white bg-custom-gray outline-none focus:ring-0 border-gray-300 h-12 text-center text-bold text-lg"
 required
 value={ParentCat}
 onChange={(e)=>{
     e.preventDefault();
     SetparentCat(e.target.value);
 }}
>
 <option className=' cursor-pointer' value={"no parent Category"}>no parent Category </option>
 {  

 Allcat.map((cat, index) => (
<option key={index} className="cursor-pointer" value={cat.Catergoy_name} >
 { cat.Catergoy_name}
</option>
))

}

  </select>

                 </div>
               
                 <div className='    w-[10%]'>
                  {imguploaded?
                    !!catimg?.links&& <div className=' relative w-[150px] h-[150px]'><img className=' w-full h-full object-contain' src={catimg.links[0]}/>
                     <div className=' opacity-0 absolute top-0 w-full h-full bg-black hover:opacity-35 right-0'>
                      <button onClick={(e)=>image_del_sub(e)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                      </button>
                  </div> </div>
                     :
                      
                      <div className='w-full h-full flex flex-col justify-center items-center' >
                      
                       {
                         Isuploading?
                         <Spinner/>:
                       <div>
                       <label className=' w-28 h-28 border  flex items-center justify-center  gap-2 bg-gray-400 cursor-pointer rounded-lg'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                     </svg>
                     <span>Upload</span>
               
               
                  <input type='file' className=' hidden cursor-pointer' onChange={UploadImages} />
               
                      </label>
                       </div>
                       }
                      </div>
                 }
                 </div>
               
               <button type='submit' className='bg-custom-gray h-12 items-center w-fit text-xl  text-white rounded-xl cursor-pointer p-2   mt-12 capitalize'>submit</button>
               </form>
  

          </div>
      }



        <div className='text-white  w-full flex-grow' style={{flexBasis: '70%'}}>
        <Table Allcat={Allcat} Catname={Catname} getcategory={getcategory} del={del}/>
        </div>
        <ToastContainer limit={1} draggable={true} position={'bottom-right'} autoClose={3000} theme='dark' pauseOnHover={false}/>

    </div>
    
  )
}

export default Categorise