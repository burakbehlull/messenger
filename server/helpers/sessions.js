const jwt = require('jsonwebtoken')
const Member = require('../models/Member')
require('dotenv/config')

const JWT_KEY = process.env.JWT_KEY

function generateRefreshToken(data){
    return jwt.sign(data, JWT_KEY, {expiresIn: '10h'})
}

async function verifyToken(token){
    const vwt = await jwt.verify(token, JWT_KEY, (err, user)=>{
        return {
            user: user,
            err: err
        }
    })
    return vwt
}

function generateAccessToken(data){
    return jwt.sign(data, JWT_KEY, {expiresIn: '30m'})
}

function isExpired(token){
    try {
        const isVerify = jwt.verify(token, JWT_KEY)
        return {expired: false, verify: isVerify}
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return {expired: true}
        } else if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature'){
            return {expired: false}
        }
        return null
    }
}

async function userUpdate(email, value){
    const updateValue = await Member.findOne({email: email})
    updateValue.token = value
    updateValue.save()
    return updateValue
}

function verifyAccessToken(user){
    try {
        let {expired} = isExpired(user.token)
        let isToken = generateRefreshToken({email: user.email})
        if(expired){
            userUpdate(user.email, isToken)
            return generateAccessToken({email: user.email})
        } 
        return generateAccessToken({email: user.email})
        

    } catch (err) {
        console.log(err)
        return err
    }
}

module.exports = {
    verifyAccessToken,
    generateAccessToken,
    generateRefreshToken,
    userUpdate,
    verifyToken,
    isExpired
}