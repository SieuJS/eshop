import React, { createContext } from "react";
import { useEffect, useState } from "react";
import useFetch from "../customize/useFetch";
import { BACK_END_SERVER as beUrl } from "../keys/BackEndKeys";
export const CatContext = createContext(null);

const CatContextProvider = (props) => {    
    const { dataFetch, isLoading, isError} = useFetch(`${beUrl}/api/categories`);
    const [allCategories, setAllCategories] = useState([]);
    useEffect(() => {
        console.log('useEffect context');
        if (dataFetch?.length > 0) {
            setAllCategories(dataFetch);
        }
    },[dataFetch])
    
    return (
        <CatContext.Provider value={{allCategories, setAllCategories, isLoading, isError}}>
            {props.children}
        </CatContext.Provider>
    )
}

export default CatContextProvider;