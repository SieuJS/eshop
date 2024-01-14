import Products from './pages/Admin/Products';
// import Categories from './pages/Admin/Categories';
import {Routes, Route } from 'react-router-dom'

function Admin() {
    return (
      <>
          <Routes>
            <Route path='/product/*' exect element={<Products />} />
            {/* <Route path='/category' exect element={<Categories />} /> */}
          </Routes>
      </>
    );
}
  
export default Admin

