import {useState, useEffect} from 'react';
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [pages,setPages] = useState(1);


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
                setPages(data.pages);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
    },[pages,url]);
    const nextPage = () => setPages()
    return {data,pages,isPending,error};
}

export default useFetch;