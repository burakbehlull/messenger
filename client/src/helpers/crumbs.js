function setSession(token){
    localStorage.setItem("token", token)
    return true
}
function getSession(){
    const session = localStorage.getItem("token")
    return session
}
function removeSession(){
    localStorage.removeItem("token")
    return true
}

export {
    setSession,
    getSession,
    removeSession
}