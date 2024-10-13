import { useState, useEffect } from 'react'
import { verify } from '@requests'
import { useAuthToken } from '@helpers'
import { Socket } from '@services'
import { DmList } from '@pages'


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

//     useEffect(()=> {
		
// 	io.sign("connect", ()=> {
// 		console.log(2)
// 	})
//      return () => {
//              io.socket.disconnect()
//          }
//      }, [user])
	 
// })


    return (
        <div className="interface">
            <div className="left">
                <DmList userId="6707ebbaddbab95fd0e3b761" />
            </div>
            <div className="right">
                
            </div>
        </div>
    )
}

export default Interface