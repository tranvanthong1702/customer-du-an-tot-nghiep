import {useEffect, useState} from "react";
import {AxiosResponse} from "axios";

interface ApiResponse<T> {
    data: T
    success: boolean
}

export default function useFetchAPI<T = any>(fetch: () => Promise<AxiosResponse<ApiResponse<T>>>,initialValue:T) {
    const [status, setStatus] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T>(initialValue);
    useEffect(() => {
        setLoading(true)
        fetch().then((res) => {
            setData(res.data.data)
            setStatus(res.data.success)
            setLoading(false)
        }).catch(err => {
            console.log('useFetchAPI error: ', err)
            setStatus(false)
            setLoading(false)
        })
    }, [fetch])

    return {data, loading, status}
}