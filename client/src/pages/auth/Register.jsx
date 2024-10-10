import { useState } from "react"
import { register } from '@requests'

function Register(){
    const [values, setValues] = useState({
        displayName: "", 
        username: "", 
        email: "", 
        password: ""
    })
    const [error, setError] = useState({})
    const [data, setData] = useState({})

    function handleChange(e){
        setValues({...values, [e.target.name]: e.target.value})
    }
    async function handleSubmit(){
        const submit = await register(values)
        if(submit.data) setData(submit.data)
        if(submit.error) setError(submit.error)
    }
    return (
        <>
            REGİSTER
            {JSON.stringify(values)}
            {JSON.stringify(data)}
            {JSON.stringify(error)}
            <input type="text" name="displayName" value={values.displayName} onChange={handleChange} placeholder="Display Name is here.." />
            <input type="text" name="username" value={values.username} onChange={handleChange} placeholder="User Name is here.." />
            <input type="email" name="email" value={values.email} onChange={handleChange} placeholder="Email is here" />
            <input type="password" name="password" value={values.password} onChange={handleChange} placeholder="Password is here.." />
            <button onClick={handleSubmit}>Kayıt ol</button>
        </>
    )
}

export default Register