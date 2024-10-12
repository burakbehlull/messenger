import axios from "axios"
const api = "http://localhost:80"

async function messageCreate(buyerUser, senderUser, { dmId, content }){
    const response = await axios.post(api+"/message/create", {buyerUser, senderUser, dmId, content}).then((res)=> {
        return {data: res.data}
    }).catch((err)=> {
        return {error: err}
    })
    return response
}

async function dmCreate({ users }){
    const response = await axios.post(api+"/dm/create", {users: users}).then((res)=> {
        return {data: res.data}
    }).catch((err)=> {
        return {error: err}
    })
    return response
}

async function getDmMessages(dmId){
    const response = await axios.get(api+`/dm/messages/${dmId}`).then((res)=> {
        return {data: res.data}
    }).catch((err)=> {
        return {error: err}
    })
    return response
}

async function getDms(userId){
    const response = await axios.get(api+`/dm/find/${userId}`)
    .then((res)=> {
        return {data: res.data}
    }).catch((err)=> {
        return {error: err}
    })
    return response
}

async function dmShow({ dmId, userId, isShow }){
    const response = await axios.post(api+"/dm/show", {dmId, userId, isShow})
    .then((res)=> {
        return {data: res.data}
    }).catch((err)=> {
        return {error: err}
    })
    return response
}

async function register({ displayName, username, email, password }) {
    const response = await axios.post(api+"/auth/create", { displayName, username, email, password }).then((res)=> {
        return {data: res.data}
    }).catch((err)=> {
        return {error: err}
    })
    return response
}

async function login({ email, password }) {
    const response = await axios.post(api+"/auth/find", { email, password }).then((res)=> {
        return {data: res.data}
    }).catch((err)=> {
        console.error('Hata: ', err.message)
        return {error: err}
    })
    return response
}

async function verify(token) {
    const response = await axios.post(api+"/auth/verify", { token }).then((res)=> {
        return {data: res.data}
    }).catch((err)=> {
        return {error: err}
    })
    return response
}


export {
    messageCreate,

    getDmMessages,
    
    dmCreate,
    getDms,
    dmShow,

    // auth
    register,
    login,
    verify
}