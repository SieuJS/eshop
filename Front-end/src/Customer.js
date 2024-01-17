import {Routes, Route } from 'react-router-dom'

import Home from "./pages/Home.js";
import Detail from "./pages/Detail.js";
import Cart from "./pages/Cart.js";
import ProductList from "./pages/ProductList.js"

function Customer() {
    return (
      <>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/detail' exact element={<Detail />} />
            <Route path='/productlist' exact element={<ProductList />} />
            <Route path='/search' exact element={<ProductList/>} />
          </Routes>
      </>
    );
  }
  
  export default Customer