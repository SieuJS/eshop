import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminStatistic from '../../components/Admin/AdminStatistic';
import AdminUser from '../../components/Admin/AdminUser';
import ShopChart from '../../components/Admin/components/Chart';
// import './admin.css'

export default function Categories() {
    return (
        <div className="grid-container page-admin">
            <AdminHeader />
            <AdminSidebar />
            <main class="main-container">
                <div class="main-title">
                    <h2>DASHBOARD</h2>
                </div>
                <AdminStatistic />
                <ShopChart />
                <AdminUser />
            </main>
        </div>
    );
}