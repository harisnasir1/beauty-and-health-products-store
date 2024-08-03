import React,{useEffect,useState} from 'react'
import {getcarts} from '../Utils/ApiRoutes'

import axios from 'axios'
const Allorders = () => {
    const [orders,setorders]=useState([]);

    useEffect(()=>{
     axios.get(getcarts)
     .then((res)=>{
        console.log(res)
        setorders(res.data.data);
     })
    },[])

    const paidradio=" accent-green-500 outline-none border-transparent  p-0";
    const unpaidradio=" accent-red-500 outline-none border-transparent  p-0";
  return (
    <div className=' flex justify-center     w-full h-full overflow-auto '>
        <div className=' w-[99%]'>
        <table className=' w-full   text-center mt-6 
        border-collapse p-0 m-0'>
        <thead className=' border-t border-b' >
            <tr>
                <td className=' w-[10vw]' >
                    id
                </td>
                <td className=' w-[25vw] '>
                    Recipient 
                </td>
                <td className=' w-[38vw]'>
                    product
                </td>
                
                <td className=' w-[8vw]' >
                    paid
                </td>
            </tr>
        </thead>
        <tbody>
        {
           orders.map((data)=>(
            <tr className='border-b shadow-lg h-[26vh]'>
              <td className='    '>
             { new Date(data.updatedAt).toLocaleDateString()}
              
              </td>
              <td className=''>
              <div className=' flex flex-col  justify-center gap-3 overflow-auto'  >
                <div className=' grid grid-cols-2 justify-center gap-0'>  <div className='font-bold text-base text-right w-[80%]'>Name       :</div>   <div className=' grid grid-cols-1 justify-start text-left'>{data.name}</div>      </div>
                <div className=' grid grid-cols-2 justify-center gap-0'>  <div className='font-bold text-base text-right w-[80%]'>Email      :</div>   <div className=' grid grid-cols-1 justify-start text-left'>{data.email}</div>      </div>
                <div className=' grid grid-cols-2 justify-center gap-0'>  <div className='font-bold text-base text-right w-[80%]'>Country    :</div>   <div className=' grid grid-cols-1 justify-start text-left'>{data.country}</div>      </div>
                <div className=' grid grid-cols-2 justify-center gap-0'>  <div className='font-bold text-base text-right w-[80%]'>potal code :</div>   <div className=' grid grid-cols-1 justify-start text-left'>{data.postalcode}</div>      </div>
                <div className=' grid grid-cols-2 justify-center gap-0'>  <div className='font-bold text-base text-right w-[80%]'>adress     :</div>   <div className=' grid grid-cols-1 justify-start text-left'>{data.name}</div>      </div>
                <div className=' grid grid-cols-2 justify-center gap-0'>  <div className='font-bold text-base text-right w-[80%]'>city       :</div>   <div className=' grid grid-cols-1 justify-start text-left'>{data.city}</div>      </div>

              </div>
              </td>
              <td className=' overflow-auto' >
              
               {!!data.line_items&&

               data.line_items.map((product,index)=>(

                <div key={index} className=' flex flex-col justify-between pr-10 pl-10 pt-3 '>
                     
                    <div className=' grid grid-cols-ordertableproduct justify-center gap-0 m-0 p-0 text-center' >
                        
                        <div >{product.price_data.product_data.name}</div>
                        <div >{product.quantity}</div>
                        <div >{product.price_data.unit_amount*product.quantity}</div>
                        <div >{!!product.property?  product.property.parameter:"no property"}</div>
                    </div>


              

                </div>

               ))
               
               }
               <div className='w-full pt-10 flex justify-center font-bold '><h2>total amount:</h2> {data.tprice}</div>
              </td>
              
              <td>
               <input type='radio' value={true} className={data.paid?paidradio:unpaidradio} checked aria-disabled   />
              </td>

            </tr>
           ))
        }

        </tbody>
       </table>
        </div>
       
    </div>
  )
}

export default Allorders