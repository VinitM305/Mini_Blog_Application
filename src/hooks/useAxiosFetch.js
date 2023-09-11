import {useState,useEffect} from 'react';
import axios from 'axios';

const useAxiosFetch = (url) =>{
    const [data,setData] = useState([]);
    const [fetcherror,setFetcherror] = useState(null);
    const [isloading,setIsloading] = useState(true);
    
    useEffect(() =>{
        let source = axios.CancelToken.source();
        const fetchData = (url) =>{
            try
            {
                const response = axios.get(url,{
                    cancelToken : source.token
                });
                setData(response.data);
                setFetcherror(null);
            }
            catch(err)
            {
                setData([]);
                setFetcherror(err.message);
            }
            finally
            {
                setIsloading(false);
            }
        }
        setTimeout(() => {
            fetchData();
          }, 2000);
        const clean = () =>{
            source.cancel();
        }
        return clean;
    },[url]);
    console.log(data);
    return {data,fetcherror,isloading};
}
export default useAxiosFetch;