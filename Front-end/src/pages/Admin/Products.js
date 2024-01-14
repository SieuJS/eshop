import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminProduct from '../../components/Admin/AdminProduct';
import './admin.css'

export default function Products() {
    return (
        <div className="grid-container">
            <AdminHeader />
            <AdminSidebar />
            <AdminProduct />
        </div>
    );
}