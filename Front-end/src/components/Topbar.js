import react from "react";
import { NavLink } from "react-router-dom";

export default function Topbar() {
    return (
        <div className="container-fluid">
            <div className="row bg-secondary py-2 px-xl-5">
                <div className="col-lg-6 d-none d-lg-block">
                    <div className="d-inline-flex align-items-center">
                        <a className="text-dark" href="">FAQs</a>
                        <span className="text-muted px-2">|</span>
                        <a className="text-dark" href="">Help</a>
                        <span className="text-muted px-2">|</span>
                        <a className="text-dark" href="">Support</a>
                    </div>
                </div>
                <div className="col-lg-6 text-center text-lg-right">
                    <div className="d-inline-flex align-items-center">
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a className="text-dark px-2" href="">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a className="text-dark pl-2" href="">
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row align-items-center py-3 px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <NavLink to="/home" className="text-decoration-none">
                        <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                    </NavLink>
                </div>
                <div className="col-lg-6 col-6 text-left">
                    <form>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search for products" />
                            <button className="btn border py-0 px-4 my-0 mx-2 input-group-text bg-transparent text-primary">
                                    <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-3 col-6 text-right">
                    <NavLink to="/favorite" className="btn border">
                        <i className="fas fa-heart text-primary"></i>
                        <span className="p-1">0</span>
                    </NavLink>
                    <NavLink to="/cart" className="btn border">
                        <i className="fas fa-shopping-cart text-primary"></i>
                        <span className="p-1">0</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}