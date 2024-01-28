import './App.css';
import Home from "./pages/Home.js";
/* import Detail from "./pages/Detail.js";
import Cart from "./pages/Cart.js";
import ProductList from "./pages/ProductList.js" */
import Product from './pages/Admin/Products.js';
import { useContext, useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthContext } from './context/AuthContext.js';

// import hook
import AuthHook from './hooks/auth-hook.js'

import Shop from './Customer'
import Admin from './Admin'
import AccountLayout from './pages/AccountLayout.js';
import AccountDashboard from "./components/Account/Dashboard.js"
import Orders from "./components/Account/Orders.js";
import Password from "./components/Account/Password.js";
import Transaction from './components/Account/Transaction.js';
import EditInfo from "./components/Account/EditInfo.js";
import Auth from './pages/Auth.js'
import { Navigate } from 'react-router-dom';
function App() {
  const [login, logout, token, userId, role] = AuthHook();
  useEffect(() => {
    console.log("app userid", userId);
    console.log("role in app", role);
  }, [])


  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider
          value={
            {
              isLoggedIn: !!token,
              login,
              logout,
              userId,
              role,
              token
            }
          }
        >
          <Routes>
            <Route path="/*" element={<Shop />} />
            <Route path='/admin/*' element={<Admin />} />
            {role && role.trim() !== "admin" && (
              <Route path="account" element={<AccountLayout />}>
                <Route index element={<AccountDashboard />} />
                <Route path="editinfo" element={<EditInfo />} />
                <Route path="orders" element={<Orders />} />
                <Route path="password" element={<Password />} />
                <Route path="transaction" element={<Transaction />} />
              </Route>
            )}
            {
              !token &&
              <>
                <Route path="/login" element={<Auth />} />
                <Route path="/*" element={<Navigate to="/login" />} />
              </>
            }
            <Route path='/*' element={<Navigate to="/home" />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;