import { useState } from 'react';
import './AdminSidebar.css'
import { NavLink } from "react-router-dom";
export default function AdminSidebar(props) {


    return (  
    <aside id="sidebar " className={ + props.show ? "" : "hide"} >
            <div className="sidebar-title">
            <div className="sidebar-brand">
                <span className="material-icons-outlined">shopping_cart</span> STORE
            </div>
            </div>

            <ul className="sidebar-list">
            <li className="sidebar-list-item">
                <NavLink to="/admin/dashboard" className={"sidebar-navlink"} >
                <span className="material-icons-outlined">dashboard</span> Dashboard
                </NavLink>
            </li>
            <li className="sidebar-list-item">
                <NavLink to="/admin/product/" className={"sidebar-navlink"}>
                <span className="material-icons-outlined">inventory_2</span> Products
                </NavLink>
            </li>
            <li className="sidebar-list-item">
                <NavLink to="/admin/category" className={"sidebar-navlink"}>
                <span className="material-icons-outlined">category</span> Categories
                </NavLink>
            </li>
            <li className="sidebar-list-item" >
                <NavLink to="/admin/accounts" className={"sidebar-navlink"}>
                <span className="material-icons-outlined">groups</span> Accounts
                </NavLink>
            </li>
            <li className="sidebar-list-item">
                <NavLink to="/"  className={"sidebar-navlink"}>
                <span className="material-icons-outlined">fact_check</span> Inventory
                </NavLink>
            </li>
            <li className="sidebar-list-item">
                <NavLink to="/"className={"sidebar-navlink"}>
                <span className="material-icons-outlined">poll</span> Reports
                </NavLink>
            </li>
            <li className="sidebar-list-item">
                <NavLink to="/"  className={"sidebar-navlink"}>
                <span className="material-icons-outlined">settings</span> Settings
                </NavLink>
            </li>
            </ul>
        </aside> 

    );
};