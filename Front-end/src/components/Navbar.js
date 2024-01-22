import { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch"
import { Link } from "react-router-dom";
import {NavLink} from "react-router-dom";
import Button from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";

export default function Navbar() {
    const auth = useContext(AuthContext)
    const [showCatNav, setShowCatNav] = useState(false);
    const { data: categories, isPending, error } = useFetch('/api/categories');
    function toggleCat() {
        setShowCatNav(prev => !prev);
    }
    return (
        <div className="bg-light container-fluid mb-5 sticky-top border-bottom">
            <div className="row border-top px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <div className="shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                        style={{ height: "65px", marginTop: "-1px", padding: "0 30px" }}
                        onClick={toggleCat}
                    >
                        <h6 className="m-0">Categories</h6>
                        <i className="fa fa-angle-down text-dark"></i>
                    </div>
                    {showCatNav &&
                        <nav className="bg-primary collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical" >
                            <div className="bg-secondary navbar-nav w-100 overflow-hidden position-absolute" >
                                {categories && (
                                    categories.map(cat => (
                                        <Link to={`/category/?catid=${cat.CatID}&page=1`} className="nav-item nav-link" key={cat.CatID}>{cat.CatName}</Link>
                                    )))
                                }
                            </div>
                        </nav>
                    }
                </div>
                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                        <a className="text-decoration-none d-block d-lg-none">
                            <h1 className="m-0 display-5 font-weight-semi-bold">
                                <span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper
                            </h1>
                        </a>
                        <button type="button" className="navbar-toggler">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0">
                                <NavLink to="/" className="nav-item nav-link active">Home</NavLink>
                                <NavLink to="/productlist" className="nav-item nav-link">All products</NavLink>
                                <NavLink to="/detail" className="nav-item nav-link">Shop Detail</NavLink>
                                <NavLink to="/contact" className="nav-item nav-link">Contact</NavLink>
                            </div>
                            <div className="navbar-nav ml-auto py-0">
                                {!auth.isLoggedIn && <NavLink to="/login" className="nav-item nav-link">Login</NavLink>}

                                {auth.isLoggedIn && 
                                <Button
                                    onClick={auth.logout}
                                >
                                    Logout
                                </Button>}
                                {
                                    auth.role === "admin" &&
                                    <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                                }
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}