import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { All_products,HomeCustomization } from "../Utils/ApiRoutes";
import Trending_Products from '../Components/Trending_Products'
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
const Home_customization = () => {
  const [products, setproducts] = useState([]);
  const [featuredpro_id, setfeaturedpro_id] = useState("");
  const [featuredpro, setfeaturedpro] = useState(null);
  const [featuredpro_id_M, setfeaturedpro_id_M] = useState("");
  const [featuredpro_M, setfeaturedpro_M] = useState(null);
  const [addedpro,setaddedpro]=useState([]);
  useEffect(() => {
    axios
      .get(All_products)
      .then((res) => {
        console.log(res.data.allproducts);
        setproducts(res.data.allproducts);
        setfeaturedpro(res.data.allproducts[0])
        featuredpro_id(res.data.allproducts[0]._id)
        setfeaturedpro_M(res.data.allproducts[0])
        featuredpro_id_M(res.data.allproducts[0]._id)

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  async function handelfeauture(e) {
    setfeaturedpro_id(e.target.value);

    console.log(
      "here is ",
      products.find((p) => p._id === e.target.value)
    );
    setfeaturedpro(products.find((p) => p._id === e.target.value));
  }
  async function handelsubmit(e){
    e.preventDefault();
   axios.post(HomeCustomization,{
    Bannerfirst:featuredpro_id,
    BannerSecond:featuredpro_id_M,
    TrendingList:addedpro
   }).then(()=>{
    toast("Home Customization is done")
   })

  }
  async function handelfeauture_M(e) {
    setfeaturedpro_id_M(e.target.value);

    console.log(
      "here is ",
      products.find((p) => p._id === e.target.value)
    );
    setfeaturedpro_M(products.find((p) => p._id === e.target.value));
  }
  async function handelsubmit(e){
    e.preventDefault();
   axios.post(HomeCustomization,{
    Bannerfirst:featuredpro_id,
    BannerSecond:featuredpro_id_M,
    TrendingList:addedpro
   
   })

  }
  return (
 
      <form  className="  h-[100vh]  w-[98%]  flex  flex-col justify-start" onSubmit={(e)=>handelsubmit(e)}>
      <div className="  flex flex-col gap-4">
        <div className=" w-[100%] bg-black h-fit lg:h-[50vh] md:h-[40vh]   grid lg:grid-cols-2 md:grid-cols-2 grid-rows-2  text-white  ">
          <div className=" bg- w-full h-fit md:h-[40vh] lg:h-[50vh]    order-2 lg:order-1   justify-center items-center lg:text-end md:text-end   flex flex-col lg:gap-12 gap-5 text-center pb-4 ">
            <div className="  w-[92%]   overflow-auto bg-whie  bgwhite lg:text-4xl md:text-2xl text-center  text-xl font-bold text-wrap font-sans capitalize">
              {featuredpro?.Product_name}
            </div>
            <div className=" lg:text-left md:text-left text-center h-[40%] overflow-auto  w-[92%]  lg:w-[40vw]  lg:text-lg sm:text-sm  font-sans flex items-left lg:leading-7 sm:leading-3">
              {featuredpro?.product_descripton}
            </div>
            <div className=" flex text-white gap-6  ">
              <div className=" flex ">
                <Link className=" p-2">
                  <button className=" bg-transparent p-2 rounded-lg lg:text-md sm:text-sm font-sans font-bold cursor-pointer border-2 border-white">
                    View more
                  </button>
                </Link>
              </div>

              <div>
                <button className=" bg-white text-black p-3 rounded-lg lg:text-2xl md:text-2xl text-base font-sans lg:font-bold cursor-pointer flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="  order-1 lg:order-2 md:h-[30vh]  lg:h-[45vh] h-[26vh] p-0   :w-full overflow-hidden flex justify-center items-end lg:items-center  lg:m-0 md:m-0  ">
            <img
              className=" w-[80%] h-[80%]  object-contain"
              src={featuredpro?.Images[0]}
            />
          </div>
        </div>
        <div className=" w-full flex justify-start text-center ml-6">
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
        </div>
      </div>
      <div>
      <Trending_Products addedpro={addedpro} setaddedpro={setaddedpro} />

      </div>

      <div className="  flex flex-col gap-4">
        <div className=" w-[100%] bg-forange h-fit lg:h-[50vh] md:h-[40vh]   grid lg:grid-cols-2 md:grid-cols-2 grid-rows-2  text-white  ">
          <div className=" bg- w-full h-fit md:h-[40vh] lg:h-[50vh]    order-2 lg:order-1   justify-center items-center lg:text-end md:text-end   flex flex-col lg:gap-12 gap-5 text-center pb-4 ">
            <div className="  w-[92%]   overflow-auto bg-whie  bgwhite lg:text-4xl md:text-2xl text-center  text-xl font-bold text-wrap font-sans capitalize">
              {featuredpro_M?.Product_name}
            </div>
            <div className=" lg:text-left md:text-left text-center h-[40%] overflow-auto  w-[92%]  lg:w-[40vw]  lg:text-lg sm:text-sm  font-sans flex items-left lg:leading-7 sm:leading-3">
              {featuredpro_M?.product_descripton}
            </div>
            <div className=" flex text-white gap-6  ">
              <div className=" flex ">
                <Link className=" p-2">
                  <button className=" bg-transparent p-2 rounded-lg lg:text-md sm:text-sm font-sans font-bold cursor-pointer border-2 border-white">
                    View more
                  </button>
                </Link>
              </div>

              <div>
                <button className=" bg-white text-black p-3 rounded-lg lg:text-2xl md:text-2xl text-base font-sans lg:font-bold cursor-pointer flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="  order-1 lg:order-2 md:h-[30vh]  lg:h-[45vh] h-[26vh] p-0   :w-full overflow-hidden flex justify-center items-end lg:items-center  lg:m-0 md:m-0  ">
            <img
              className=" w-[80%] h-[80%]  object-contain"
              src={featuredpro_M?.Images[0]}
            />
          </div>
        </div>
        <div className=" w-full flex justify-start text-center ml-6">
          <select
            onChange={(e) => {
              handelfeauture_M(e);
            }}
            value={featuredpro_id_M}
            className=" bg-black text-white text-xl text-left w-fit p-2 leading-7"
          >
            {!!products &&
              products.map((pro, index) => (
                <option value={pro._id}>{pro.Product_name}</option>
              ))}
          </select>
        </div>
      </div>

      <div className="w-[130px] h-[60px] bg-black mt-16 rounded-2xl">
        <button type="submit" className=" w-full h-full text-white text-3xl font-bold capitalize ">
          submit
        </button>
       
      </div>
      
      <ToastContainer limit={1} draggable={true} position={'bottom-right'} autoClose={3000} theme='dark' pauseOnHover={false}/>

    </form>


  );
};

export default Home_customization;
