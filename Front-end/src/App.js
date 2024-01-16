import './App.css';
import Home from "./pages/Home.js";
import Detail from "./pages/Detail.js";
import Cart from "./pages/Cart.js";
import ProductList from "./pages/ProductList.js"
import Product from './pages/Admin/Products.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
        <BrowserRouter>  
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin/product' exact element={<Product/>} />
            <Route path='/productlist' exact element={<ProductList />} />
            <Route path='/search' exact element={<ProductList/>} />
            <Route path='/category/:catid' exact element= {<ProductList/>}/>
            <Route path='/product/:proid' exact element = {<Detail/>} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;