import {createContext, useEffect, useState} from 'react'
import Cart from '../pages/Cart';
import {Getproducts, get_product} from '../Utils/apiroutes'
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
 export const cartcontext=createContext({});
 
export function CartContextProvider({children}){

    const [cartpoducts,setcardproducts]=useState(
        
   []);

 useEffect(()=>{
  cartpoducts?.length>0&& localStorage.setItem('Cart',JSON.stringify(cartpoducts))
 },[cartpoducts])
  

 useEffect(()=>{
 localStorage.getItem('Cart')&&localStorage.getItem('Cart').length>0&&
 setcardproducts(JSON.parse(localStorage.getItem('Cart')))
 console.log(cartpoducts);
 },[])

 async function removeproducts(productid)
 {
  const newIds = [...cartpoducts];
  const index = newIds.indexOf(productid);
  if (index !== -1) {
    newIds.splice(index, 1);
    setcardproducts(newIds);
}
 }

 async function emptycart()
 {
   setcardproducts([]);
   localStorage.setItem('Cart',"");
 }

 async function addproducts(productid){
   const res= await axios.post(get_product,{
        id:productid,
    })
    const productqty=res.data.allproducts.qty;
    const productCount = cartpoducts.filter(id => id === productid).length;
   if(productCount<productqty)
    {
        setcardproducts(prev=>[...prev,productid]);
        toast(`${res.data.allproducts.Product_name} has been added to your cart. `)

    }
 
   else{
     toast(`Cannot add more than ${res.data.allproducts.qty} items of ${res.data.allproducts.Product_name} `)
   }
   }

return(
    <>
        <cartcontext.Provider value={{cartpoducts,setcardproducts,addproducts,removeproducts,emptycart}} >{children}</cartcontext.Provider>
    <ToastContainer draggable={true} position={'bottom-right'} autoClose={3000} theme='dark' pauseOnHover={false}/>
</>

)
}