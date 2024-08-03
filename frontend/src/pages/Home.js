import React,{useState,useEffect} from 'react'
import Header from '../Components/Header'
import Featured from '../Components/Featured'
import LatesetProduct from '../Components/LatesetProduct'
import Categories_home from '../Components/Categories_home'
import Trending_Products from '../Components/Trending_Products'
import Mid_Banner from '../Components/Mid_Banner'
import {Link} from 'react-router-dom'
import {Getproducts,Getfeaturedproducts} from '../Utils/apiroutes'
import axios from 'axios'
const Home = () => {
 
  const [Feautured_First,Set_Feautured_First]=useState(null)
  const [Feautured_Second,SetFeautured_Second]=useState(null);
  const [trendingproducts,Set_Trending_products]=useState([]);



  useEffect(()=>{
     axios.get(Getfeaturedproducts)
     .then((res)=>
      {
        
        // res.data.r[0].Feautured_First&&  Set_Feautured_First(res.data.r[0].Feautured_First);
        // res.data.r[0].Feautured_Second && SetFeautured_Second(res.data.r[0].Feautured_Second);
         res.data.r[0].Trending_products&&  Set_Trending_products(res.data.r[0].Trending_products);
        
      }
    );
  
  },[])

  return (
    <div className=' bg-custom-white '>
    <Header/>
    <Featured  />
    <Categories_home/>
    <Trending_Products trendingproducts={trendingproducts}/>
    
    <LatesetProduct/>
  
    </div>
  )
}

export default Home