import {Routes, Route } from 'react-router-dom'

import Home from "./pages/Home.js";
import Detail from "./pages/Detail.js";
import Cart from "./pages/Cart.js";
import ProductList from "./pages/ProductList.js"
import Account from './pages/AccountLayout.js';

function Customer() {
    return (
      <>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/category/:catid' exact element= {<ProductList/>}/>
            <Route path='/product/:proid' exact element = {<Detail/>} />
            <Route path='/productlist' exact element={<ProductList />} />
            <Route path='/search' exact element={<ProductList/>} />
            <Route path='/account' exact element={< Account/>} />
          </Routes>
      </>
    );
  }
  
  export default Customer