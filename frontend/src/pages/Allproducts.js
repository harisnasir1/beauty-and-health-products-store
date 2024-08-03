import React, { useEffect,useState,useRef } from 'react'
import Header from '../Components/Header'
import {All_products,Getall_Categories} from '../Utils/apiroutes'
import ProductBox from '../Components/ProductBox'
import axios, { all } from 'axios'
const Allproducts = () => {
    const [products,setproducts]=useState([]);
    const [fproducts,setfproducts]=useState([]);
    const [categories,setcategories]=useState([]);
    const [Subcategories,setSubcategories]=useState([]);
    const [parentcat,setparentcat]=useState("All");
    const [childcat,setchildcat]=useState("");
    const [toggle,settoggle]=useState(false);

    useEffect(()=>{
      setparentcat("All")
       axios.get(All_products)
       .then((res)=>{
       // console.log(res.data.allproducts);
        setproducts(res.data.allproducts);
        setfproducts(res.data.allproducts)

       })
       .catch((error)=>{
        console.log(error)
       })
    },[])
    useEffect(()=>{
       axios.get(Getall_Categories)
       .then((res)=>{
       console.log(res.data.result)
        setcategories(res.data.result)
        setSubcategories(res.data.result)
       })
       .catch((error)=>{
        console.log(error);
       })

    },[products])

 

    const handelparentchange=(e)=>{
    
     setparentcat(e.target.value);
     setchildcat("")
    
    }
    const handelchildcat=(e)=>{
    
      setchildcat(e.target.value);
     
     }
     function parentname(startcat){
           
           
      let result = [];
      
      let currentcategory=categories.find(cat=>cat?._id===startcat)
      result.push(currentcategory?.Catergoy_name);
       
      while(currentcategory && currentcategory?.parent?._id)
        {
          currentcategory=categories.find(cat=>cat?._id===currentcategory.parent?._id);
          if(currentcategory?.Catergoy_name)
            {
              result.push(currentcategory?.Catergoy_name)
            }
        }
      
      return result;
            

            
     }
    
     function getAllChildren(parentId) {
      // Helper function to recursively get children
      function getChildrenRecursive(id) {
        const directChildren = categories.filter(cat => cat.parent && cat.parent?._id.toString() === id.toString());
        
        const allChildren = directChildren.flatMap(child => [child, ...getChildrenRecursive(child?._id)]);
        console.log(allChildren);
        return allChildren;
      }
    
      // Start the recursion with the given parentId
      return getChildrenRecursive(parentId);
    }
    


     useEffect(()=>{
      if(parentcat.length>0  || childcat.length>0)
        {
          const fillter=products.filter((pro)=>{
            if(childcat.length>0)
             {
             
              const allparents=parentname(pro.Category?._id);
              console.log("inside child ",allparents)
              return  pro.Category?.Catergoy_name===childcat||  allparents.includes( childcat) ;
              
             }
            else if(parentcat.length>0 && parentcat!="All")
             {
             
              const allparents=parentname(pro.Category?._id);
              //console.log("inside parent ",allparents)
              return  pro.Category?.Catergoy_name === parentcat ||  allparents.includes( parentcat) ;
             }
             else
             {
               return true
             }
        });
        setfproducts(fillter);
       // console.log("fillter",fillter);
        }
      
     },[parentcat,childcat])
     
     useEffect(()=>{
      if(parentcat=="All")
        {
          setSubcategories(categories.filter(cat => cat.parent));
        }
        else
        {

          let result = [];
      
          let currentcategory=categories.find(cat=>cat?.Catergoy_name==parentcat)
             const all=  getAllChildren(currentcategory?._id)       
              setSubcategories(all);
                
        }
     },[parentcat])

    
    function handeltoggle(e)
    {
     
      console.log("hello toggle", toggle)
      settoggle(!toggle);
      
    }
     

  return (
    <div className=' w-full bg-custom-white h-[100vh]'>
        <Header/>
        
        

      <div className=' ml-3 mt-4 md:mt-3 font-bold text-3xl'>
        
      
    <div className='flex p-0 m-0 gap-0 lg:gap-1 xl:gap-3 bg'>

     <div className='  fixed lg:static z-10' >
     <div className='    mt-5 flex justify-start xl:hidden cursor-pointer'>

<button className=' z-40' onClick={handeltoggle}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-9">
 <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
</svg>
</button>
    </div>
    
    <div  className={`${toggle?'-left-0':'-left-full'} ease-in-out duration-500 bg-white border-r w-[20] md:w-[100] xl:w-[16vw]  h-[80vh] md:h-[86vh] md rounded-xl z-10 fixed xl:static    text-xl pl-5`} >
    <h2 className=' mt-2 text-xl'>Categories</h2>
         <div className=' w-full h-[30%]  overflow-auto  pr-9'>

         
      <div className=' h-full flex flex-col justify-start mt-6 gap-6 text-center'>
      <div className=' grid  grid-cols-category gap-3 p-0 m-0  '>
            <div className='  flex justify-end'>
              <input
               id={`category-All`}
               value={"All"} 
                type='radio' 
                checked={parentcat==="All"}
                 onChange={handelparentchange}/>
              </div>
            <div className=' text-left font-light'>
              <label className=' cursor-pointer' 
              htmlFor={`category-All`}
               >ALL</label></div>
          </div>
        {
          categories.map((cat)=>
            cat.parent?"":
          <div className=' grid  grid-cols-category gap-3 p-0 m-0 '>
            <div className='  flex justify-end'>
              <input
              id={`category-${cat?.Catergoy_name}`}
               value={cat?.Catergoy_name} 
                type='radio' 
                checked={parentcat===cat?.Catergoy_name}
                 onChange={handelparentchange}/>
              </div>
            <div className=' text-left font-light'>
              <label className=' cursor-pointer' 
              htmlFor={`category-${cat?.Catergoy_name}`} 
               >{cat.Catergoy_name}</label></div>
          </div>
          )
        }
      </div>
         </div>

         <h2 className=' mt-16 text-xl'>Sub Categories</h2>

         <div className=' w-full h-[30%]  overflow-auto  pr-9'>

         
<div className=' h-full flex flex-col justify-start mt-6 gap-6 text-center'>
  {
    Subcategories.map((cat)=>
      cat.parent&&
    <div className=' grid  grid-cols-category gap-3 p-0 m-0 '>
      <div className='  flex justify-end'>
        <input  type='radio'
         id={`subcategory-${cat?.Catergoy_name}`}
        value={cat?.Catergoy_name}
        checked={childcat===cat?.Catergoy_name}
        onChange={handelchildcat}
        />
        </div>
      <div className=' text-left font-light font-sans'>
        <label htmlFor={`subcategory-${cat?.Catergoy_name}`}>{cat?.Catergoy_name}</label></div>
    </div>
    )
  }
</div>
         </div>
     
    </div>

     </div>


    <div className='   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  m-9 md:mr-20  text-base z-0 ml-14 md:ml-0   gap-12 mt-5 pb-3 w-[70vw] md:w-[100vw] h-[83vh] overflow-auto no-scrollbar scroll-smooth'>
     { 
        fproducts.map((data,index)=>
        

                  (  <ProductBox  key={index} {...data}/>)
        
        )
     }
    </div>

    </div>


      </div>
    </div>
  )
}

export default Allproducts