import { useState } from "react"
import { login } from '@requests'

function Login(){
    const [values, setValues] = useState({
        email: "", 
        password: ""
    })
    const [error, setError] = useState({})
    const [data, setData] = useState({})

    function handleChange(e){
        setValues({...values, [e.target.name]: e.target.value})
    }
    async function handleSubmit(){
        const submit = await login(values)
        if(submit.data) setData(submit.data)
        if(submit.error) setError(submit.error)
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