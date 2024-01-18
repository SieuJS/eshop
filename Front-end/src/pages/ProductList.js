import Topbar from "../components/Topbar.js";
import Navbar from "../components/Navbar.js";
import PageHeader from "../components/PageHeader.js";
import ProductList from "../components/ProductList.js";
import usePaginationFetch from "../hooks/usePaginationFetch.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function () {
    const curUrl = window.location.search;
    const params = new URLSearchParams(curUrl);
    const _keyword = params.get('keyword') || "";
    const _catid = params.get('catid') || useParams().catid;
    console.log(_catid);
    const _page = params.get('page') || 1;
    var urlFetch = `/api/search?keyword=${_keyword}&page=${_page}`;
    if (_catid!=null) {
        urlFetch += `&catid=${_catid}`
    }
    const {data: products,pages, isPending, Error} = usePaginationFetch(urlFetch);

    return (
        <>
            <Topbar />
            <Navbar />
            {products && <ProductList products={products} page={_page} pages={pages}/>}
        </>
    )
}