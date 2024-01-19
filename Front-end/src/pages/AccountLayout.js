import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideBar from "../components/Account/SideBar";
import { Outlet } from "react-router-dom";

export default function AccountLayout() {
    return (
        <>
            <Topbar />
            <Navbar />

            <div className="container-fluid mb-5 my-2 py-2">
                <div className="row border px-xl-5 bg-light py-4">
                    <div className="col-lg-3 d-none d-lg-block">
                        <SideBar />
                    </div>
                    <div className="col-lg-9 bg-light">
                        <Outlet />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}