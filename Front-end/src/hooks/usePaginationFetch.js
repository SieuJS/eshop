import {useState, useEffect} from 'react';
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [page,setPage] = useState();
    const [pages,setPages] = useState();

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that url');
                }
                return res.json();
            }) 
            .then(data => {
                setData(data.products);
                let params = new URLSearchParams(url);
                let _page = params.get('page') || 1;
                _page = parseInt(_page);
                setPage(_page);
                setPages(data.pages);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
    },[page,url]);
    return {data,page,pages,isPending,error};
}

export default useFetch;