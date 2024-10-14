import { getDms } from '@requests'
import { useEffect, useState } from 'react'

function Dmlist({userId}){
    
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [dms, setDms] = useState(null)
    const handleSubmit = async () => {
        const submit = await getDms(userId)
        if(submit.data) {
            setData(submit.data)
            setDms(submit.data['dms'])
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
            <ul>
                {dms?.map((dm, i)=> {
                    return <li key={i}> {dm.dmName} </li>
                })}
            </ul>
        </>
    )
}

export default Dmlist