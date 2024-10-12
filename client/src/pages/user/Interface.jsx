import { useState, useEffect } from 'react'
import { verify } from '@requests'
import { useAuthToken } from '@helpers'
import { Socket } from '@services'


function Interface() {
    const [error, setError] = useState({})
    const [data, setData] = useState({})

    const { getToken } = useAuthToken()
    const token = getToken()

    const io = new Socket()
    
    async function handleSubmit(){
        const submit = await verify(token)
        if(submit.data) {
            console.log("verify data", submit.data)
            setData(submit.data)
        }
        if(submit.error) setError(submit.error)
    }

    useEffect(()=>{
        io.sign('user', (data)=>{
            console.log('CLIENT DATA', data)
        })
    })

    useEffect(()=> {
        io.send('test', 'bu bir datadır')
        handleSubmit()
    }, [])
    
    return (
        <>
            Interface
        </>
    )
}

export default Interface