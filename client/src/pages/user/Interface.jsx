import { useState, useEffect } from 'react'
import { verify } from '@requests'
import { useAuthToken } from '@helpers'

function Interface() {
    const [error, setError] = useState({})
    const [data, setData] = useState({})

    const { getToken } = useAuthToken()
    const token = getToken()

    async function handleSubmit(){
        const submit = await verify(token)
        if(submit.data) {
            console.log("verify data", submit.data)
        }
        if(submit.error) setError(submit.error)
    }

    useEffect(()=> {
        handleSubmit()
    }, [])
    
    return (
        <>
            Interface
        </>
    )
}

export default Interface