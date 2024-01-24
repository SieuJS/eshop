import { Routes, Route } from 'react-router-dom'
import { useState } from 'react';

import Home from "./pages/Home.js";
import Detail from "./pages/Detail.js";
import Cart from "./pages/Cart.js";
import ProductList from "./pages/ProductList.js"
import Account from './pages/AccountLayout.js';
import Checkout from './pages/Checkout.js'

function Customer() {
  return (
    <>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/category' exact element={<ProductList />} />
        <Route path='/product/:proid' exact element={<Detail />} />
        <Route path='/productlist' exact element={<ProductList />} />
        <Route path='/search' exact element={<ProductList />} />
        <Route path='/cart' exact element={< Cart />} />
        <Route path='/checkout' exact element = {< Checkout />} />
      </Routes>
    </>
  );
}

export default Customer