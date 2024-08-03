import React, { useEffect, useState } from "react";
import { All_products, Getall_Categories } from "../Utils/ApiRoutes";
import TrendingBox from "../Components/TrendingBox";
import axios, { all } from "axios";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Trending_Products = (props) => {
  const {addedpro,setaddedpro}=props
    const [products, setproducts] = useState([]);
    const [featuredpro_id, setfeaturedpro_id] = useState("");
    const [featuredpro, setfeaturedpro] = useState(null);
    const [pro_id,setpro_id]=useState([]);
   
    useEffect(()=>{
       
         axios.get(All_products)
         .then((res)=>{
          const allProducts = res.data.allproducts;
         // console.log(res.data.allproducts);
         setproducts(res.data.allproducts);
         if (allProducts.length > 0) {
          setfeaturedpro_id(allProducts[0]._id);
          setfeaturedpro(allProducts[0]);
      }         })
         .catch((error)=>{
          console.log(error)
         })
      },[])

      async function handelfeauture(e) {
        console.log(e);
        e.preventDefault();
        setfeaturedpro_id(e.target.value);
    
       
        setfeaturedpro(products.find((p) => p._id === e.target.value));
      }
    const scroll_right = () => {
      let slider = document.getElementById("scrol");
      slider.scrollLeft += 500;
    };
  
    const scroll_left = () => {
      let slider = document.getElementById("scrol");
      slider.scrollLeft -= 500;
    };

    const  handelsubmit=(e)=>
    {
         e.preventDefault();
         
         
          setaddedpro((prev)=>{
           if( prev.includes(featuredpro))
            {
              toast("product is Already added")
              return prev;
            }
            else{
              return [...prev,featuredpro]
            }
          });
          
    }
    function delete_tpro(e,id)
    {
     e.preventDefault();
    setaddedpro( addedpro.filter((data)=>data._id!==id));

    }
    return (
      <div className="bg-blck mt-5 h-[530px] w-[86vw] overflow-hidden flex flex-col">
        <div className="text-4xl  font-bold mt-5 flex justify-start ml-44 capitalize ">
          Trending Products
        </div>
    {    addedpro.length>0?
        <div className="w-full flex justify-center items-center h-full p-2">
          <div className="flex w-[5%] h-full items-center justify-end">
            <button onClick={scroll_left}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
            </button>
          </div>
          <div
            id="scrol"
            className="w-[90%] flex justify-start h-[100%] bg-blck overflow-x-auto text-base gap-5 mt-5 no-scrollbar   scroll-smooth"
          >
            {addedpro&&addedpro.map((data, index) => (
              <TrendingBox key={index} {...data} delete_tpro={delete_tpro} />
            ))}
          </div>
          <div className="flex w-[5%] h-full justify-start">
            <button onClick={scroll_right}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
        :
        <div  className="w-full flex justify-center items-center h-full p-2">
          <h1>There is no Trending products added</h1>
        </div>

}



        <div className=" text-4xl w-full h-full bg-blck z-80">
        <div className=" w-full flex justify-start  gap-3 text-center ml-6">
          
          <select
            onChange={(e) => {
              handelfeauture(e);
            }}
            value={featuredpro_id}
            className=" bg-black text-white text-xl text-left w-fit p-2 leading-7"
          >
            
            {!!products &&
              products.map((pro, index) => (
                <option value={pro._id}>{pro.Product_name}</option>
              ))}
          </select>
          <button type="submit" className=" bg-black p-2 rounded-2xl w-fit text-white " onClick={(e)=>handelsubmit(e)}>
            Add
          </button>
          
        </div>
        </div>
      </div>
    );
  };
export default Trending_Products