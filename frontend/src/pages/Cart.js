import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { cartcontext } from '../Components/CartContext'
import {getcartproduct,addCart} from '../Utils/apiroutes'
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify'


const Cart = () => {
    const location = useLocation();
    const stripePromise = loadStripe('pk_test_51PPkVx2KHSQiU4J9vDHovCYtSxmIa17t7loaLudwavo9OZLR5trT9XOBfcVQc4vJIC8A60B6G4z1R3GH1QoslnGL00anFuhQeM');
    const navigate=useNavigate();
   const {cartpoducts,addproducts,removeproducts,emptycart}=useContext(cartcontext)
   const [products,setproducts]=useState();
   const [name,setname]=useState();
   const [email,setemail]=useState();
   const [postalcode,setpostalcode]=useState();
   const [address,setaddress]=useState();
   const [city,setcity]=useState();
   const [country,setcountry]=useState();
   const [selected_para,seselected_para]=useState({});
   const [select_cartpros,setselect_cartpros]=useState({});
   const [signal,setsignal]=useState(false);
   useEffect(()=>{
     axios.post(getcartproduct,{
        id:cartpoducts
     })
     .then((res)=>{
        console.log("getting the cart data  ",res.data.allproducts);
        setproducts(res.data.allproducts)
        

        const initialParameters = {};
        res.data.allproducts.forEach(product => {
            if(product.property)
                {
                    initialParameters[product._id] = {
                        parameter: product.property.parameters[0],
                        name:product.property.name,
                      };
                      setselect_cartpros(initialParameters);
                }
        
      });
     
        
     })
     .catch((e)=>{
        console.log("error on getting cart products :",{e})
     })
   },[cartpoducts])
   
   let totall=0;
   for(const productId of cartpoducts)
      { 
        const price = products?.find(p => p._id === productId)?.product_price||0  ;
       
        totall+=parseFloat(price);
        

      }

  
      const handel_para = (productId, parameter, quantity,pro_name) => {
        
        console.log("i am here", pro_name);
        
        setselect_cartpros(prevState => ({
          ...prevState,
          [productId]: { parameter,pro_name }
        }));
      };
      useEffect(()=>{

      })
      useEffect(()=>{
      //console.log("i want to see this :", select_cartpros)
      },[select_cartpros])

     
  


      const handelsubmit=(e)=>{
        e.preventDefault();
        console.log("see this");
        console.log(select_cartpros);
        console.log(cartpoducts);
        const billingdata={
            name,
            email,
            city,
            country,
            address,
            postalcode
        }
        axios.post(addCart,{
            select_cartpros,
            cartpoducts,
            billingdata,
        })
        .then(async (res)=>{
            console.log("line items ",res)
            if (res.status) {
                console.log()
                // Redirect to Stripe Checkout
                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({
                  sessionId: res.data.sessionId,
                });
        
                if (error) {
                  console.error('Stripe error:', error);
                }
                //else{
                //  const params = new URLSearchParams(location.search);
                //  const isSuccess = params.get('success');
                //  emptycart();
                //  navigate("/Msg");
                //  if (isSuccess === 'true' ) {
                //    
                //  toast('Order is placed');
                //   
                //
                //}
              //}
              } 
              
              else {
                console.error('Backend error:', res.error);
              }
        })
        

      }
  return (
    <div className=' bg-custom-white h-[100%] lg:h-[100vh] overflow-hidden'>
   <Header/>

   <div className=' grid grid-row-2 lg:grid-cols-cart_main_grid gap-16 ml-5 mr-5 lg:ml-12 lg:mr-12 mt-10'>
    <div className='bg-white  bg-transparent rounded-lg shadow-xl border-cart-boxes  font-bold h-[70vh] overflow-auto scroll-smooth     '>
     <div  className=' flex justify-start ml-[10vw] m-3 text-3xl capitalize '>cart</div>
  <div className='  w-[90%] ml-7  '>

  { !!products?.length>0 &&(
     <table className='w-[100%] text-left  '>
       
            <tr className=' text-base md:text-xl font-bold '>
                <th className=' pb-6  text-center'>Product  </th>
                <th className=' pb-6 pr-3 md:pr-0'>property    </th>
                <th className=' pb-6 '>Quantity </th>
                <th className=' pb-6'>price    </th>
                
            </tr>
           
            <tbody>
            {products.map((product)=>(
    

        <tr  className=' text-base  ' >
            <td className=' pb-7  pt-7 flex flex-col justify-center align-middle items-center border-t gap-4'>
                <div className='h-[80px] md:h-[140px] w-[100px] md:w-[180px]  bg-cart-img-back flex justify-center rounded-lg border-cart-img-box border-cart-img-color'>
                <img className=' max-h-[100%] max-w-[100%] bg-cover' src={product.Images[0]}/>

                </div>
                {product.Product_name}
             </td>
             <td className=' pb-6 pt-2  border-t '>
                
               {  !! product.property?( <div className=' felx flex-col gap-7'>
                <div  className='mb-6 text-base'>{product.property.name}</div>
                <select
                value={selected_para[product._id]}
                onChange={(e)=>handel_para(product._id,e.target.value,cartpoducts.filter(id=>id===product._id ).length,product.property.name)}
                >{
              !! product.property && product.property.parameters.map((para,index)=>(
           <option key={index} value={para}>{para}</option>
              ))    
             }
                  </select>
               </div>):""}
             
             </td>

            <td className=' pb-6 pt-2   border-t'>
                <div className=' flex justify-between gap-2 max-w-[50%] text-left max-h-20 '>
                <button className=' bg-custom-white w-full h-8 text-lg font-bold text-center border-cart-img-box rounded-lg shadow-lg'
                onClick={(e)=>{
                    
                    removeproducts(product._id)}}
                >
                    -
                    </button>
                <div className=' text-center w-9 h-9 text-lg '> {cartpoducts.filter(id=>id===product._id ).length}</div>
                 <button  className=' bg-custom-white w-full text-lg h-8 font-bold text-center border-cart-img-box rounded-lg shadow-lg'
                 onClick={(e)=>{
                    
                    addproducts(product._id)
                }}
                 >
                    +
                    </button>
                </div>

                 </td>
             <td className=' pb-6 pt-2  border-t '>
              $  {product.product_price *cartpoducts.filter(id=>id===product._id ).length }</td>
        </tr>
    )

 
)}
            </tbody>
        
     </table>
 )}
  </div>
  <div className=' flex justify-end mr-10 text-lg '><h3 className='text-center border-t-2 w-32'>$ {totall}</h3></div>
    </div>







    <div className='bg-white h-[70vh]  bg-transparent p-2 rounded-lg  shadow-xl  border-cart-boxes font-bold   text-3xl   '>
    <div className=' mt-20 text-center'> Order Information</div>
     
     <form className=' flex flex-col items-center gap-8 h-full  bg-contain pb-8' onSubmit={handelsubmit}>
       
     <input type='text' placeholder='Name' name='name' className=' text-black mt-5  text-lg text-center leading-9  rounded-lg  w-[90%]
        border-cart_input_boxes border-gray  outline-none shadow-lg' value={name} onChange={(e)=>setname(e.target.value)}  required/>
    
    <input type='email' placeholder='Email' name='email' className=' text-black  text-lg text-center leading-9  rounded-lg  w-[90%]
        border-cart_input_boxes border-gray  outline-none shadow-lg'value={email} onChange={(e)=>setemail(e.target.value)} required/>

    <div className=' flex justify-around'>
    <input type='text' placeholder='City' name='city' className=' text-black  text-lg text-center leading-9  rounded-lg  w-[40%]
        border-cart_input_boxes border-gray  outline-none shadow-lg'value={city} onChange={(e)=>setcity(e.target.value)} required/>

    <input type='text' placeholder='postal code' name='postal code' className=' text-black  text-lg text-center leading-9  rounded-lg  w-[40%]
        border-cart_input_boxes border-gray  outline-none shadow-lg'value={postalcode} onChange={(e)=>setpostalcode(e.target.value)} required/>

    </div>
    <input type='text' placeholder='street address' name='street address' className=' text-black  text-lg text-center leading-9  rounded-lg  w-[90%]
        border-cart_input_boxes border-gray  outline-none shadow-lg' value={address} onChange={(e)=>setaddress(e.target.value)} required/>
            
            <input type='text' placeholder='country' name='country' className=' text-black  text-lg text-center leading-9  rounded-lg  w-[90%]
        border-cart_input_boxes border-gray  outline-none shadow-lg' value={country} onChange={(e)=>setcountry(e.target.value)}  required/>

     <button className=' bg-custom-gray w-fit p-2 text-center  rounded-lg text-lg text-white   cursor-pointer flex justify-center '
     >Continue Payment</button>

     </form>
     
    </div>

   </div>

    </div>
  )
}

export default Cart
