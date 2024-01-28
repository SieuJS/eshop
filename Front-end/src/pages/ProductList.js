import Topbar from "../components/Topbar.js";
import Navbar from "../components/Navbar.js";
import PageHeader from "../components/PageHeader.js";
import ProductList from "../components/ProductList.js";
import usePaginationFetch from "../hooks/usePaginationFetch.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import {BACK_END_SERVER} from '../keys/BackEndKeys.js'

export default function (props) {
    const navigate = useNavigate();
    const curUrl = window.location.search;
    const params = new URLSearchParams(curUrl);
    const _keyword = params.get('keyword') || "";
    const _catid = params.get('catid');
    var page = params.get('page');
    if (page == null) {
        page = 1;
        params.set('page',page);
    }
    page = parseInt(page);
    var urlFetch = BACK_END_SERVER + `/api/search?${params.toString()}`;


    const {data: products, pages, isPending, Error} = usePaginationFetch(urlFetch);
    
    const onPageChange = (e,index) => {
        params.set('page',index);
        const newURL = `${window.location.pathname}?${params.toString()}`;
        navigate(newURL);
    }
    const addToCart = props.addToCart;
    return (
        <>
            <Topbar />
            <Navbar />
            {<ProductList products={products} page={page} pages={pages} onPageChange={onPageChange}/>}
        </>
    )
}