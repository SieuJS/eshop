import { useState, useEffect } from "react";
import CatCard from "./CatCard";
import catList from "../data/categories.js";

export default function Categories() {
    const [categoriesList, setCategoriesList] = useState([]);
    useEffect(() => {
        setCategoriesList(catList);
    }, []);

    return (
        <div className="container-fluid pt-5">
            <div className="row px-xl-5 pb-3">
                <h2>Popular categories</h2>
            </div>
            <div className="row px-xl-5 pb-3">
                {categoriesList.map(category => (
                    <CatCard
                        category={{...category}}
                    />
                ))}
            </div>
        </div>
    );
};