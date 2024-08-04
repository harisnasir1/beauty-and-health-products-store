import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartcontext } from './CartContext';

const Header = () => {
  const { cartpoducts } = useContext(cartcontext);
  const [show, setShow] = useState(false);

  return (
    <div className='w-full z-20 text-black  bg-custom-white   pb-5 md:pb-0  h-[8vh] flex justify-between  mr-3 relative'>
      <div className='h-full text-black font-sans  text-center mt-2  ml-3 md:ml-6 lg:ml-10  text-2xl md:text-3xl flex items-center gap-4 lg:text-5xl font-GreatVibes font-semibold'><Link to='/'>Khy elite </Link></div>
      <div className='w-[40vw] h-full hidden md:flex items-center justify-end gap-9 font-bold text-xl pr-20'>
        <Link className='  hover:border-b ease-in-out duration-200' to='/'>Home</Link>
       
        <Link className='  hover:border-b ease-in-out duration-200' to='/Allproducts'>Allproducts</Link>
        <Link className='  hover:border-b-3 ease-in-out duration-200 flex gap-2' to='/Cart'>
        
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
</div> 
<div> 
  {cartpoducts.length}


</div>




</Link>






      </div>
      <div className='md:hidden mr-3 flex align-bottom justify-between  items-center w-[30%] bg-whit  h-full mt-3'>
                <div className=' h-full flex  align-middle items-center'>     
                   <Link className=' flex gap-3  w-full' to='/Cart' onClick={() => setShow(false)}>
                   <div>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

                     </div>
                    <div>({cartpoducts.length})</div>
                    
                    
                    </Link>
                </div>
                  <div className=' h-full flex align-middle items-center '>
                      <button onClick={() => setShow(!show)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-7 h-7 md:w-9 md:h-9 text-white  ">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                      </button>
                  </div>

      </div>
      {show && (
        <div className='fixed top-0 right-0 w-full h-[100vh] overflow-hidden  bg-black text-black flex flex-col items-start justify-start p-6 z-10 transform transition-transform duration-300 ease-in-out'>
          <button className='self-end mb-6' onClick={() => setShow(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
         <div className=' flex flex-col  w-full h-fit text-lg  text-right  justify-start pt-[5vh]  gap-12'>
          <Link className='  w-full' to='/' onClick={() => setShow(false)}>Home</Link>
          <Link className='  w-full' to='/' onClick={() => setShow(false)}>About</Link>
          <Link className='  w-full' to='/Allproducts' onClick={() => setShow(false)}>Allproducts</Link>
          <Link className='  w-full' to='/' onClick={() => setShow(false)}>Account</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
