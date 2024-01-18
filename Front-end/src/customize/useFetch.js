import { useEffect } from "react"
import { useState } from "react";

const useFetch = (url) => {
    let [dataFetch, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        console.log("useFetch custom");
        const fetchData = async () => {
            setIsLoading(true)
            try {
                let res = await fetch(url);
                let responseData = await res.json();
                // dataFetch = await res.json();
                // console.log(dataFetch);
                setData(responseData);
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