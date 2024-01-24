import Products from './pages/Admin/Products';
import Categories from './pages/Admin/Categories';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard'
import CatContextProvider from './context/CatContext';
import Landing from './pages/Admin/Landing';
function Admin() {
  return (
    <>
      <CatContextProvider>
        <Routes>
          <Route path='/product/*' exect element={<Products />} />
          <Route path='/category' exect element={<Categories />} />
          <Route path='/' exect element={< Landing />} />
          <Route path='/dashboard' exect element={<Dashboard />} />
        </Routes>
      </CatContextProvider>
    </>
  );
}

export default Admin

