import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';

import Home from "./pages/Home.js";
import Detail from "./pages/Detail.js";
import Cart from "./pages/Cart.js";
import ProductList from "./pages/ProductList.js"
import Account from './pages/AccountLayout.js';
import Checkout from './pages/Checkout.js'
import { AuthContext } from './context/AuthContext.js';
import { useContext } from 'react';


function Customer() {
  const {isLoggedIn} = useContext(AuthContext)
  const [inPath , setInPath] = useState()
  const routes = (
    <>
      <Route path='/cart' exact element={< Cart />} />
      <Route path='/checkout' exact element = {< Checkout />} />
    </>
  )
  
  useEffect(()=> {

  })

  useEffect(()=> {
    if(isLoggedIn) {
      
    }
  }, [isLoggedIn])
  return (
    <>
      <Routes>
       
        <Route path='/category' exact element={<ProductList />} />
        <Route path='/product/:proid' exact element={<Detail />} />
        <Route path='/productlist' exact element={<ProductList />} />
        <Route path='/search' exact element={<ProductList />} />
        { isLoggedIn && routes}
      </Routes>
    </>
  );
}

export default Customer