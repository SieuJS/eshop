import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideBar from "../components/Account/SideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export default function AccountLayout() {
    const [changes, setChanges] = useState(0);
    const auth = useContext(AuthContext);
    //console.log("AccountLayout rendered");
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
                        {!auth.isLoggedIn && "You are not sign in yet"}
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}