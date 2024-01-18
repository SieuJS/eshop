import React, { createContext } from "react";
import { useEffect, useState } from "react";
import useFetch from "../customize/useFetch";

export const CatContext = createContext(null);

const CatContextProvider = (props) => {    
    const { dataFetch, isLoading, isError} = useFetch(`/api/categories`);
    const [allCategories, setAllCategories] = useState([]);
    useEffect(() => {
        console.log('useEffect context');
        setAllCategories(dataFetch.data)
    },[dataFetch])
    
    return (
        <CatContext.Provider value={{allCategories, setAllCategories, isLoading, isError}}>
            {props.children}
        </CatContext.Provider>
    )
}

export default CatContextProvider;