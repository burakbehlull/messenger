import { getDmMessages } from '@requests'
import { Message } from '@pages'
import { useState, useEffect } from 'react'

function Messages({dmId}){

    const [error, setError] = useState({})
    const [data, setData] = useState([])
    
    console.log("submit d", dmId)
    async function handleSubmit(){
        const submit = await getDmMessages(dmId)
        if(submit.data) {
            setData(submit.data['messages'])
            console.log("submit", submit.data)
        }
        if(submit.error) setError(submit.error)
    }

    useEffect(()=> {
        handleSubmit()
    }, [])

    return (
        <>
            Messages
            <ul>
                {data?.map((message)=><>
                    <Message data={message} />
                </>)}
            </ul>
        </>
    )
}

export default Messages