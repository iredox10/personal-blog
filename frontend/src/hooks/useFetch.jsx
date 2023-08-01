import { useEffect, useState } from "react"
import axios from 'axios'
const UseFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetch= async () =>{
            try {
                const res = await axios.get(url)
                setIsPending(false)
                setData(res.data)
            } catch (err) {
                setError(err)
            }
        }
        fetch()
    } , [url])
    return {data, isPending, error}
}

export default UseFetch