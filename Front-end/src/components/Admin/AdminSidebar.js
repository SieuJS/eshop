import './AdminSidebar.css'
import { NavLink } from "react-router-dom";
export default function AdminSidebar() {
    const closeSidebar = () => {
        console.log('close');
    }

    return (
        <aside id="sidebar">
            <div className="sidebar-title">
            <div className="sidebar-brand">
                <span className="material-icons-outlined">shopping_cart</span> STORE
            </div>
            <span className="material-icons-outlined" onClick={() => closeSidebar()}>close</span>
            </div>

            <ul className="sidebar-list">
            <li className="sidebar-list-item">
                <NavLink to="/admin" target="_blank" className={"sidebar-navlink"} >
                <span className="material-icons-outlined">dashboard</span> Dashboard
                </NavLink>
            </li>
            <li className="sidebar-list-item">
                <NavLink to="/admin/product" className={"sidebar-navlink"}>
                <span className="material-icons-outlined">inventory_2</span> Products
                </NavLink>
            </li>
            <li className="sidebar-list-item">
                <NavLink to="/admin/category" className={"sidebar-navlink"}>
                <span className="material-icons-outlined">category</span> Categories
                </NavLink>
            </li>
            <li className="sidebar-list-item" >
                <NavLink to="/admin/customers" target="_blank" className={"sidebar-navlink"}>
                <span className="material-icons-outlined">groups</span> Customers
                </NavLink>
            </li>
            <li className="sidebar-list-item">
                <NavLink to="/" target="_blank" className={"sidebar-navlink"}>
                <span className="material-icons-outlined">fact_check</span> Inventory
                </NavLink>
            </li>
            <li className="sidebar-list-item">
                <NavLink to="/" target="_blank" className={"sidebar-navlink"}>
                <span className="material-icons-outlined">poll</span> Reports
                </NavLink>
            </li>
            <li className="sidebar-list-item">
                <NavLink to="/" target="_blank" className={"sidebar-navlink"}>
                <span className="material-icons-outlined">settings</span> Settings
                </NavLink>
            </li>
            </ul>
        </aside> 
    );
};