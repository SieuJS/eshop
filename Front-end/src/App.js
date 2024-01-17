import './App.css';
import Home from "./pages/Home.js";
import Detail from "./pages/Detail.js";
import Cart from "./pages/Cart.js";
import Product from './pages/Admin/Products.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shop from './Customer'
import Admin from './Admin'

function App() {
  return (
    <>
        <BrowserRouter>  
          <Routes>
            <Route path='/*' element={<Shop />} />
            <Route path='/admin/*' exact element={<Admin/>} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
