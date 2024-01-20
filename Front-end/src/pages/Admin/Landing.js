import React from 'react'
import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import ShopChart from '../../components/Admin/components/Chart';
function Landing() {
  return (
    <div className="grid-container page-admin">
            <AdminHeader />
            <AdminSidebar />
            <main className="main-container">
                <ShopChart/>
            </main>
        </div>
  )
}

export default Landing