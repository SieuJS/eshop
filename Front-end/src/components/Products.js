import {useState, useEffect} from "react";
import ProductCard from "./ProductCard";
import productsList from "../data/products.js";

export default function Products() {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        setProductList(productsList);
    }, []);

    return (
        <div className="container-fluid pt-5">
            <div className="text-center mb-4">
                <h2 className="section-title px-5"><span className="px-2">Trandy Products</span></h2>
            </div>

            <div className="row px-xl-5 pb-3">

                {productList.map(product => (
                    <ProductCard item={{...product}}/>
                ))}

            </div>
        </div>
    );
};