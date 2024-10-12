import { useState, useEffect } from 'react'
import { verify } from '@requests'
import { useAuthToken } from '@helpers'
import { Socket } from '@services'


function Interface() {
    const [error, setError] = useState({})
    const [data, setData] = useState({})
    const [user, setUser] = useState({})

    const { getToken } = useAuthToken()
    const token = getToken()

    const io = new Socket()
    
    async function handleSubmit(){
        const submit = await verify(token)
        if(submit.data) {
            console.log("verify data", submit.data)
            setData(submit.data)
            setUser(submit.data.user)
        }
        if(submit.error) setError(submit.error)
    }

    useEffect(()=> {
        handleSubmit()
    }, [])
    // useEffect(()=> {
        
    //     return () => {
    //         io.socket.disconnect()
    //     }
    // }, [user])


    return (
        <>
            Interface
            {JSON.stringify(data.user)}
        </>
    )
}

export default Interface