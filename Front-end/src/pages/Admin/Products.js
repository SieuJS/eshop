import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminProduct from '../../components/Admin/AdminProduct';
import AdminCatProduct from '../../components/Admin/AdminCatProduct';
import AdminAddProduct from '../../components/Admin/AdminAddProduct';
import AdminEditProduct from '../../components/Admin/AdminEditProduct';
import {Routes, Route } from 'react-router-dom'
// import './admin.css'

export default function Products() {
    return (
        <div className="grid-container page-admin">
            <AdminHeader />
            <AdminSidebar />
            <main className="main-container">
                <div className="row">
                    <Routes>
                        <Route path = "/" exact element={<AdminCatProduct />}>
                            <Route path=':catID' exact element={<AdminProduct /> } />
                        </Route>
                        <Route path="add/:catID" exact element={<AdminAddProduct />} />
                        <Route path="edit/" exact element={<AdminEditProduct />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}