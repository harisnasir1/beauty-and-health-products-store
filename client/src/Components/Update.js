import { Select } from '@mui/material'
import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {get_category,get_product,UpdateProduct,Upload_Images,Getall_Categories,Getall_properties} from '../Utils/ApiRoutes'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs';
import Spinner from '../Components/Spinner'

const Update = () => {
    

 const navigate=useNavigate();
  const [selectedValue, setSelectedValue] = useState("US");    //region 
  const [name, setname] = useState("");
  const [Description, setDiscription] = useState('');
  const [price, setprice] = useState('');
  const [qty, setqty] = useState('');
  const [images,setimages]=useState([])
  const [Categories,Setcatgories]=useState([]);
  const[Isuploading,SetIsUploading]=useState(false);
  const [product_category,setproduct_category]=useState("");
  const [properties,setproperties]=useState([]);
  const [property,setproperty]=useState("");
const _id=useParams();

    useEffect(()=>{
     axios.post(get_product,{
        id:_id.id
     })
     .then(async(res)=>{

     console.log(res.data.allproducts);
     setname(res.data.allproducts.Product_name);
     setprice(res.data.allproducts.product_price)
     setSelectedValue(res.data.allproducts.Region);
     setDiscription(res.data.allproducts.product_descripton);
     setqty(res.data.allproducts.qty);
     setimages(res.data.allproducts.Images)
     setproduct_category(res.data.allproducts.Category)
     setproperty(res.data.allproducts.property)
     })
     .catch((e)=>{})
    },[_id])
    useEffect(()=>{
      axios.get(Getall_properties)
      .then((res)=>{
       setproperties(res.data.result);
       console.log("here is the properties :" , res.data.result)
      })
     },[])
    useEffect(()=>{
     axios.get(Getall_Categories)
     .then((res)=>{
      Setcatgories(res.data.result);
      console.log("here is the catogries :" , res.data.result)
     })
    },[])
   

  const handleChange = (event) => {
    event.preventDefault();
    if(event.target.value!== selectedValue)
    setSelectedValue(event.target.value);

  };
  const  handel_property_Change=(event)=>
    {
      if(event.target.value!== product_category)
      setproperty(event.target.value);
      console.log(event.target.value)
  
      }
 
  const handel_catogry_Change=(event)=>
  {
    if(event.target.value!== product_category)
    setproduct_category(event.target.value);
    console.log(event.target.value)

    }

  const datavalidation=()=>{
    console.log(typeof(price));
    if(name.length<3)
      {
        toast("the name of the product should be greater then 3")
        return false;
      }
      return true;
     
  }
  const handelSubmit=(event)=>{
    event.preventDefault();
    if(datavalidation()){
      console.log(property)
    axios.post(UpdateProduct, {
      Product_name:name,
      product_descripton:Description,
      Region:selectedValue,
      product_price:price,
      id:_id.id,
      qty:qty,
      Images:images,
      Category:product_category,
      property:property,

  }  )
  .then((res)=>{toast("product have been added");
    navigate("/Products ")
  })
  .catch((e)=>console.log("adding products recives an erro", {e}))
    }
    

  }
  const UploadImages =async(e)=>
    {
      const files=e.target?.files;
      SetIsUploading(true);
       if(files?.length>0)
        {
          const data= new FormData();
          Array.from(files).forEach(file => {
            data.append('file',file);
          });
           const res=await axios.post(Upload_Images,data,);
           console.log(res.data);
           setimages(oldimgs=>{
           return [ ...oldimgs,...res.data.links]
           })
        }
        SetIsUploading(false);
    }
    function UpdateImagesOrder(neworder){
      setimages(neworder);
      }
  return (
   <div className='flex flex-col align-baseline items-center w-full h-full gap-0'>


    <div className='text-black text-3xl font-bold bg-white w-full flex-grow flex flex-col justify-around pl-10' style={{flexBasis: '2%'}} >
  <div className=' mt-3 cursor-pointer' onClick={()=>navigate('/products')}> <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
</svg>
</div> 

      <h1 className='pl-10 text-custom-black'>Edit Product</h1>
    </div>





    <div className='text-black  w-full flex-grow ' style={{flexBasis: '98%'}}>
     <form className='  w-full h-full p-5 mt-6 pl-20 pr-20 flex flex-col gap-6 ' onSubmit={handelSubmit}>
      <div className=' flex w-full gap-56'>
         <div className=' flex flex-col gap-2 '>
      <label className=' text-2xl text-custom-gray font-bold capitalize'>product name</label>
      <input placeholder='Product-name' className=' text-black  font-bold rounded p-2 w-full
       border-2 border-gray  outline-none'value={name} onChange={(e)=>setname(e.target.value)} required/>
      
         </div>
      

      <div className='flex flex-col gap-2'>
      <label className=' text-2xl text-custom-gray font-bold capitalize'>product Category</label>
      <select
        className="w-[15vw]  text-white bg-custom-gray outline-none focus:ring-0 border-gray-300 h-12 text-center text-bold text-lg"
       value={product_category}
       onChange={handel_catogry_Change}
        required
      >
        
        { 
        
          Categories.map((cat)=>
         (
          <option className="cursor-pointer text-center" value={cat._id}>{cat.Catergoy_name}</option>
         )
          )
        }
       
       
      </select>
      </div>

      <div className=' flex flex-col gap-2 '>
     <label className=' text-2xl text-custom-gray font-bold capitalize '>product properties </label>
     <select
        className="w-[15vw]  text-white bg-custom-gray outline-none focus:ring-0 border-gray-300 h-12 text-center text-bold text-lg"
       value={property}
       onChange={handel_property_Change}
        
      >
        
        <option className="cursor-pointer text-center" value={""} >no Property select</option>
        { properties?.length?
        
        properties.map((cat)=>
       (
        <option className="cursor-pointer text-center" value={cat._id}>{cat.name}</option>
       )
        )
        :""
      }
     
       
       
      </select>
     </div>
     
      </div>

      <div className=' flex flex-col gap-2 '>
      <label className=' text-2xl text-custom-gray font-bold capitalize'>product Description </label>
      <textarea placeholder='product Description 'className=' text-black  font-bold rounded p-2 w-full
       border-2 border-gray  outline-none' rows={5} value={Description} onChange={(e)=>setDiscription(e.target.value)} required/>
       </div>

      <div className=' flex justify-between'>
       <div className=' flex flex-col gap-2 '>
      <label className=' text-2xl text-custom-gray font-bold capitalize'>price in {
        selectedValue==="pak"? "Pkr":selectedValue==="US"?"USD":selectedValue==="UK"?"Pounds":"pkr"
      }</label>
        <input placeholder='Product price' className=' text-black  font-bold rounded p-2 w-[20vw]
       border-2 border-gray  outline-none' value={price} onChange={(e)=>{
        const val=e.target.value;
        if (val === '' || /^\d+(\.\d{0,2})?$/.test(val)) {
          setprice(val);
        }
        else{
          toast("enter only Numeric values");
        }
       }} required />
      </div>




      <div className=' flex flex-col gap-2 '> 
      <label className=' text-2xl text-custom-gray font-bold capitalize'>Quantity</label>
        <input placeholder='Quantity of this product' className=' text-black  font-bold rounded p-2 w-[20vw]
       border-2 border-gray  outline-none' value={qty} onChange={(e)=>{
        const val=e.target.value;
        if (val === '' || /^\d+(\.\d{0,2})?$/.test(val)) {
          setqty(val);
        }
        else{
          toast("enter only Numeric values");
        }
       }} required />
      </div>




     <div className=' flex flex-col gap-3 mr-60'>
      <label className=' text-2xl text-custom-gray font-bold capitalize'>Select Region</label>
       <select
        className="w-[10vw] text-white bg-custom-gray outline-none focus:ring-0 border-gray-300 h-12 text-center text-bold text-lg"
        value={selectedValue}
        onChange={handleChange}
        required
      >
        <option className="cursor-pointer" value="pak">Pakistan</option>
        <option className="cursor-pointer" value="US">America</option>
        <option className="cursor-pointer" value="UK">United Kingdom</option>
      </select>
      </div>

      
      </div>



      <div className=' mb-26 flex flex-col gap-3'>



        <label className=' text-2xl text-custom-gray font-bold capitalize '>Images</label>
        <div className='flex flex-wrap gap-2 '>
        <ReactSortable list={images} setList={UpdateImagesOrder} className='flex flex-wrap gap-2'>
  {!!images.length && images.map(link => (
    <div key={link} className='lex-grow flex-shrink basis-auto max-h-fit '>
      <img src={link} className='h-28 rounded-lg max-h-full' />
    </div>
  ))}
  </ReactSortable>
</div>
<div>
          {Isuploading?
       <Spinner/> : <label className=' w-28 h-28 border  flex items-center justify-center  gap-2 bg-gray-100 cursor-pointer rounded-lg'>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
      </svg>
      <span>Upload</span>


   <input type='file' className=' hidden cursor-pointer' onChange={UploadImages} multiple/>

       </label>
        }
        </div>
      {
        !images?.length&&(
          <div>
            No images uploaded for this product
          </div>
        )
      }
      </div>





      <button className='bg-custom-gray  w-fit text-xl  text-white rounded-xl cursor-pointer p-2   mt-3 capitalize'>Update</button>
     </form>
    </div>





        <ToastContainer draggable={true} position={'bottom-right'} autoClose={8000} theme='dark' pauseOnHover={false}/>

   </div>
  )
}



export default Update