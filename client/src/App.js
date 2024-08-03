
import './App.css';
import {BrowserRouter,Routes,Route}from "react-router-dom"
import Login from "./Components/pages/login"
import Signup from './Components/pages/Signup'
import Products from './Components/Products.js'
import AddProduct from './Components/AddProduct.js'
import Main from './Components/pages/Main'
import Update from './Components/Update.js'
import  Categorise from './Components/Categorise.js'
import Properties from './Components/Properties.js'
import Allorders from './Components/Allorders.js'
import Home_customization from './Components/Home_customization.jsx'
function App() {
  return (
    
   <BrowserRouter>
   
   <Main>
   <Routes>
   <Route path='/Allorders' element={<Allorders/ >}/>
    <Route path='/products' element={<Products/ >}/>
    <Route path='/AddProduct' element={<AddProduct/>}/>
    <Route path='/Update/:id' element={<Update/>}/>
    <Route path='/Categorise' element={<Categorise/>}/>
    <Route path='/Properties' element={<Properties/>}/>
    <Route path='/' element={<Home_customization/>}/>

   

   </Routes>
   </Main>
   </BrowserRouter>
  
  );
}

export default App;
