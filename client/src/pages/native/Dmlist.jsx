import { getDms } from '@requests'
import { useEffect, useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'


function Dmlist({userId}){
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [dms, setDms] = useState(null)
    const handleSubmit = async () => {
        const submit = await getDms(userId)
        if(submit.data) {
            setData(submit?.data)
            setDms(submit?.data['dms'])
        }
        if(submit?.error) setError(submit?.error)
        if(!submit?.data?.success || error) setError({error: submit?.data?.message})
            
    }
    useEffect(()=> {
        handleSubmit()
        console.log(data)
    }, [])

    function handleNavigate(dm){
        navigate(`/interface/dm/${dm?.id}`, {state: {dm: dm}})
    }
    return (
        <>
            DM LIST
            <ul>
                {dms?.map((dm, i)=> {
                    return (<Fragment key={i}>
                        <li onClick={()=> handleNavigate(dm)}> 
                            {dm.dmName}
                        </li>
                    </Fragment>)
                })}
            </ul>
        </>
    )
}

export default Dmlist