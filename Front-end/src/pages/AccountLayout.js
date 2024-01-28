import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideBar from "../components/Account/SideBar";
import { Outlet, useOutletContext } from "react-router-dom";
import { useState } from "react"

export default function AccountLayout() {
    const [changes, setChanges] = useState(0);
    
    return (
        <>
            <Topbar />
            <Navbar />

            <div className="container-fluid mb-5 my-2 py-2">
                <div className="row border px-xl-5 bg-light py-4">
                    <div className="col-lg-3 d-none d-lg-block">
                        <SideBar changes={changes} />
                    </div>
                    <div className="col-lg-9 bg-light">
                        <Outlet context={[changes, setChanges]} />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}