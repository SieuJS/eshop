import Topbar from "../components/Topbar.js";
import Navbar from "../components/Navbar.js";
import PageHeader from "../components/PageHeader.js";
import ProductDetail from "../components/ProductDetail.js";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";

export default function Detail() {
    const {proid} = useParams();
    const {data, isPending, Error} = useFetch(`http://localhost:3000/api/product/${proid}`);
    return (
        <>
            <Topbar />
            <Navbar />
            <PageHeader />
            {data && <ProductDetail data= {data}/>}
        </>
    );
};