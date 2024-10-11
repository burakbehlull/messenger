import { Link } from "react-router-dom"

export default function IsLogin({fallback, errorMessage}){
    const isLogin = true
    if(errorMessage && !isLogin){
        return errorMessage
    }
    if(!isLogin){
        return <h1 className="no-login"><Link to="/">Giriş</Link> yapınız.</h1>
    }
    
    return fallback
}