import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminStatistic from '../../components/Admin/AdminStatistic';
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
                <AdminStatistic/>
            </main>
        </div>
    );
}