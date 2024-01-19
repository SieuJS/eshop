import './App.css';
import Home from "./pages/Home.js";
/* import Detail from "./pages/Detail.js";
import Cart from "./pages/Cart.js";
import ProductList from "./pages/ProductList.js" */
import Product from './pages/Admin/Products';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shop from './Customer'
import Admin from './Admin'
import AccountLayout from './pages/AccountLayout.js';
import AccountDashboard from "./components/Account/Dashboard.js"
import Orders from "./components/Account/Orders.js";
import Password from "./components/Account/Password.js";
import EditInfo from "./components/Account/EditInfo.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Shop />} />
          <Route path='/admin/*' exact element={<Admin />} />
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<AccountDashboard />} />
            <Route path="editinfo" element={<EditInfo />}/>
            <Route path="orders" element={<Orders />} />
            <Route path="password" element={<Password />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
