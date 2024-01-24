import { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch"
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";

export default function Navbar() {
    const auth = useContext(AuthContext)
    const [showCatNav, setShowCatNav] = useState(false);
    const [showAccountOptions, setShowAccountOptions] = useState(false);
    const { data: categories, isPending, error } = useFetch('/api/categories');
    function toggleCat() {
        setShowCatNav(prev => !prev);
    }
    function toggleAccount() {
        setShowAccountOptions(prev => !prev);
    }
    return (
        <div className="bg-light container-fluid mb-5 sticky-top border-bottom">
            <div className="row border-top px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <button className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                        style={{ height: "65px", marginTop: "-1px", padding: "0 30px" }}
                        onClick={toggleCat}
                    >
                        <h6 className="m-0">Categories</h6>
                        <i className="fa fa-angle-down text-dark"></i>
                    </button>
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
                <div className="col-lg-6">
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
                        </div>
                    </nav>
                </div>
                <div className="col-lg-3">
                    <div className="navbar-nav ml-auto py-0">
                        {!auth.isLoggedIn && <NavLink to="/login" className="nav-item nav-link text-right">Login/Register</NavLink>}
                        {auth.isLoggedIn &&
                            (<div>
                                <div
                                    className="shadow-none d-flex align-items-center justify-content-end w-100 m-0 "
                                    style={{ height: "65px", marginTop: "-1px", padding: "0 0" }}
                                >
                                    <Button onClick={toggleAccount}>


                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </Button>

                                </div>
                                {showAccountOptions && (
                                    <nav className="collapse show navbar align-items-start justify-content-end p-0 border border-top-0 border-bottom-0 navbar-vertical navbar-light">
                                        <div className="bg-secondary navbar-nav overflow-hidden position-absolute" >
                                            <div>
                                                <span className="mx-1">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        height="24px" width="24px"
                                                        className="w-6 h-6">
                                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                                <Link to="/account">
                                                    <Button>
                                                        Account
                                                    </Button>
                                                </Link>
                                            </div>
                                            <div>
                                                <span className="mx-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" id="logout"><path d="M21.9 10.6c-.1-.1-.1-.2-.2-.3l-2-2c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l.3.3H16c-.6 0-1 .4-1 1s.4 1 1 1h2.6l-.3.3c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l2-2c.1-.1.2-.2.2-.3.1-.3.1-.5 0-.8z"></path><path d="M17 14c-.6 0-1 .4-1 1v1c0 .6-.4 1-1 1h-1V8.4c0-1.3-.8-2.4-1.9-2.8L10.5 5H15c.6 0 1 .4 1 1v1c0 .6.4 1 1 1s1-.4 1-1V6c0-1.7-1.3-3-3-3H5c-.1 0-.2 0-.3.1-.1 0-.2.1-.2.1l-.1.1c-.1 0-.2.1-.2.2v.1c-.1 0-.2.1-.2.2V18c0 .4.3.8.6.9l6.6 2.5c.2.1.5.1.7.1.4 0 .8-.1 1.1-.4.5-.4.9-1 .9-1.6V19h1c1.7 0 3-1.3 3-3v-1c.1-.5-.3-1-.9-1zM6 17.3V5.4l5.3 2c.4.2.7.6.7 1v11.1l-6-2.2z"></path></svg>
                                                </span>
                                                <Button onClick={auth.logout}>
                                                    Logout
                                                </Button>
                                            </div>

                                        </div>
                                    </nav>

                                )}
                            </div>)
                        }
                        {auth.role === "admin" &&
                            <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                        }
                    </div>
                </div>
            </div >
        </div >
    );
}