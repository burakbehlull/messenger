const Member = require('../models/Member')


async function findUser(username){
    try {
        const member = await Member.findOne({username: username})
        return member
    } catch (error) {
        console.log('Hata: ', error.message)
        
    }
}

async function isOnline(userId, isOnline){
    try {
        const user = await Member.findOneAndUpdate({id: userId}, { isOnline: isOnline })
        if(!user){
            return {
                success: true,
                message: 'Güncellenmedi.',
                code: 400
            }
        }
        return {
            success: true,
            message: 'Güncellendi',
            code: 200

        }
    } catch(err){
        console.error('Hata: ', err.message)
        return {
            success: false,
            message: 'Hata',
            error: err.message,
            code: 400
        }
    }

}

module.exports = {
    findUser,
    isOnline
}