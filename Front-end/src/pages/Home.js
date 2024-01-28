import react from "react";
import Topbar from "../components/Topbar.js";
import Navbar from "../components/Navbar.js";
import Featured from "../components/Featured.js";
import Categories from "../components/Categories.js";
import TrandyProduct from "../components/TrandyProduct.js";
import Footer from "../components/Footer.js";
import usePaginationFetch from "../hooks/usePaginationFetch.js";
import ProductList from "../components/ProductList.js";
import {BACK_END_SERVER} from '../keys/BackEndKeys.js'
import { useNavigate } from "react-router-dom";

export default function Home() {
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
    return (
        <>
            <Topbar />
            <Navbar />
            <Featured />
            <TrandyProduct products={products} page={page} pages={pages} onPageChange={onPageChange} />
            <Footer />
        </>
    );
}