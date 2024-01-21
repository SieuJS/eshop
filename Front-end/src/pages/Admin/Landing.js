import React from 'react'
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import ShopChart from '../../components/Admin/components/Chart';
import Statistic from '../../components/Admin/Statistic';
function Landing() {
  return (
    <div className="grid-container page-admin">
            <AdminHeader />
            <AdminSidebar />
            <main className="main-container">
                <Statistic/>
                <ShopChart/>
            </main>
        </div>
  )
}

export default Landing