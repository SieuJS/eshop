import Products from './pages/Admin/Products';
import Categories from './pages/Admin/Categories';
import { Routes, Route } from 'react-router-dom';
import CatContextProvider from './context/CatContext';

function Admin() {
    return (
      <>
        <CatContextProvider>
          <Routes>
            <Route path='/product/*' exect element={<Products />} />
            <Route path='/category' exect element={<Categories />} />
          </Routes>
        </CatContextProvider>
      </>
    );
}
  
export default Admin

