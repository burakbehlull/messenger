import axios from "axios"
const api = "http://localhost:80"

async function messageCreate({buyerUserId, senderUserId, dmId, content}){
    const response = await axios.post(api+"/message/create", {buyerUserId, senderUserId, dmId, content}).then((res)=> {
        return res.data
    }).catch((err)=> {
        return err
    })
    return response
}

async function dmCreate({users}){
    const response = await axios.post(api+"/dm/create", {users: users}).then((res)=> {
        return res.data
    }).catch((err)=> {
        return err
    })
    return response
}

async function register({displayName, username, email, password }) {
    const response = await axios.post(api+"/user/create", { displayName, username, email, password }).then((res)=> {
        return res.data
    }).catch((err)=> {
        return err
    })
    return response
}

async function login({ email, password }) {
    const response = await axios.post(api+"/user/find", { email, password }).then((res)=> {
        return res.data
    }).catch((err)=> {
        return err
    })
    return response
}

export {
    messageCreate,
    dmCreate,

    // auth
    register,
    login
}