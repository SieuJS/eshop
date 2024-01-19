import { NavLink } from "react-router-dom";
export default function Account() {
    return (
        <>
            <div>
                <span><b>Username</b></span>
            </div>
            <nav className="d-flex flex-column">
                <NavLink to="/account">Dashboard</NavLink>
                <NavLink to="/account/orders">Orders</NavLink>
                <NavLink to="/account/editinfo">Edit information</NavLink>
                <NavLink to="/account/password">Password</NavLink>
            </nav>
        </>
    );
}