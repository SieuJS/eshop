import { useEffect } from "react"
import { useState } from "react";

const useFetch = (url) => {
    console.log(url);
    let [dataFetch, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        console.log("useFetch");
        const fetchData = async () => {
            try {
                let res = await fetch(url);
                dataFetch = await res.json();
                console.log(dataFetch);
                setData(dataFetch);
                setIsLoading(false)
                setIsError(false)
            } catch (e) {
                setIsError(true);
                setIsLoading(false)
            }
        }
        fetchData()
    }, [url])

    return {
        dataFetch, isLoading, isError
    }
}

export default useFetch;