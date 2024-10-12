import { useState } from "react"
import { useNavigate } from 'react-router-dom'

import { login } from '@requests'
import { useAuthToken } from '@helpers'

function Login(){
    const [values, setValues] = useState({
        email: "", 
        password: ""
    })

    const [error, setError] = useState({})
    const [data, setData] = useState({})

    const navigate = useNavigate()
    const { setToken, removeToken } = useAuthToken()

    function handleChange(e){
        setValues({...values, [e.target.name]: e.target.value})
    }

    async function handleSubmit(){
        const submit = await login(values)
        if(submit.error) setError(submit.error)
        if(!submit.data.success) setError({error: submit.data.message})
        
        if(submit.data) {
            
            setData(submit.data)
            const token = submit.data['accessToken']
            removeToken()
            setToken(token)
            navigate('/interface')
        }
    }
    return (
        <>
            Login
            {JSON.stringify(values)}
            {JSON.stringify(data)}
            {JSON.stringify(error)}
            <input type="email" name="email" value={values.email} onChange={handleChange} placeholder="Email is here" />
            <input type="password" name="password" value={values.password} onChange={handleChange} placeholder="Password is here.." />
            <button onClick={handleSubmit}>Giriş yap</button>
        </>
    )
}

export default Login