import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {cartcontext} from './CartContext'
const ProductBox = ({Product_name,product_price,Product_descripton ,Images,_id}) => {
  const {addproducts}= useContext(cartcontext);

  return (
    <div className='  text-center flex flex-col gap-1'> 
        
        <Link to={`/Detail/${_id}`} className='bg-white  bg-transparent  rounded-lg shadow-xl  h-[240px] w-full text-xl   flex justify-center items-center'>
        <img className='w-full h-full object-contain p-2 ' src={Images&&Images[0]}/>
          
        </Link>
        <Link to={`/Detail/${_id}`} className=' = h-[6vh]'>{Product_name}</Link>
        <div className=' flex gap-3  h-[8vh] text-lg m-0 font-sans font-none   justify-center  text-center align-middle'>
          
       
        <div className=' flex   w-[100%] justify-around '>
          <div className=' '>
            <h2 className='text-2xl align-middle items-center font-bold p-2'> $ {product_price}</h2>
           </div>
        
          <button className=' bg-custom-gray w-[110px] h-[60px] p-0 text-center  rounded-lg text-base text-white   cursor-pointer flex justify-center align-middle items-center '
          onClick={(e)=>{
            e.preventDefault();
            addproducts(_id);
          }}
          >
                Add to cart

              </button>
        
        
        </div>
        
           




        </div>
     </div>
  )
}

export default ProductBox