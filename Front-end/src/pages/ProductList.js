import Topbar from "../components/Topbar.js";
import Navbar from "../components/Navbar.js";
import PageHeader from "../components/PageHeader.js";
import ProductList from "../components/ProductList.js";
import usePaginationFetch from "../hooks/usePaginationFetch.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'

export default function () {
    const navigate = useNavigate();
    const curUrl = window.location.search;
    const params = new URLSearchParams(curUrl);
    const _keyword = params.get('keyword') || "";
    const _catid = params.get('catid') || useParams().catid;
    var _page = params.get('page') || 1;
    var urlFetch = `/api/search?keyword=${_keyword}&page=${_page}`;
    if (_catid!=null) {
        urlFetch += `&catid=${_catid}`
    }
    const {data: products,page, pages, isPending, Error} = usePaginationFetch(urlFetch);
    
    const onPageChange = (index) => {
        params.set('page',index);
        const newURL = `${window.location.pathname}?${params.toString()}`;
        navigate(newURL);
    }
    return (
        <>
            <Topbar />
            <Navbar />
            {products && pages && <ProductList products={products} page={page} pages={pages} onPageChange={onPageChange}/>}
        </>
    )
}