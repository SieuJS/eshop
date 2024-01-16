import Topbar from "../components/Topbar.js";
import Navbar from "../components/Navbar.js";
import PageHeader from "../components/PageHeader.js";
import ProductList from "../components/ProductList.js";
import useFetch from "../hooks/useFetch.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function () {
    const curUrl = window.location.search;
    const params = new URLSearchParams(curUrl);
    const _keyword = params.get('keyword') || "";
    const _catid = params.get('catid') || useParams().catid;
    var urlFetch = `http://localhost:3000/api/search?keyword=${_keyword}`;
    if (_catid!=null) {
        urlFetch += `&catid=${_catid}`
    }
    const {data: products, isPending, Error} = useFetch(urlFetch);
    return (
        <>
            <Topbar />
            <Navbar />
            {products && <ProductList products={products} />}
        </>
    )
}