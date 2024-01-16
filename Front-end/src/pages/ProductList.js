import Topbar from "../components/Topbar.js";
import Navbar from "../components/Navbar.js";
import PageHeader from "../components/PageHeader.js";
import ProductList from "../components/ProductList.js";
import useFetch from "../hooks/useFetch.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function () {
    const url = window.location.search;
    const params = new URLSearchParams(url);
    const keyword = params.get('keyword');
    const urlFetch = `http://localhost:3000/search?keyword=${keyword}`;
    const {data: products, isPending, Error} = useFetch(urlFetch);
    return (
        <>
            <Topbar />
            <Navbar />
            {products && <ProductList products={products} />}
        </>
    )
}