import { getDms } from '@requests'
import { useEffect, useState } from 'react'

function Dmlist({userId}){
    
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const handleSubmit = async () => {
        const submit = await getDms(userId)
        if(submit.data) {
            setData(submit.data)
        }
        if(submit.error) setError(submit.error)
        if(!submit.data.success || error) setError({error: submit.data.message})
            
    }
    useEffect(()=> {
        handleSubmit()
        console.log(data)
    }, [])

    

    return (
        <>
            DM LIST
            {JSON.stringify(data)}
        </>
    )
}

export default Dmlist