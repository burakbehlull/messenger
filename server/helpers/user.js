const Member = require('../models/Member')


async function findUser(username){
    const { username } = req.body
    try {
        const member = await Member.findOne({username: username})
        return member
    } catch (error) {
        console.log('Hata: ', error.message)
        
    }
}


module.exports = {
    findUser
}