const DM = require('../models/DM')
const { generateRandomNumber } = require('../helpers/misc')
const { findUser } = require('../helpers/user')


async function userDmCreate(req, res){
    try {
        const { users } = req.body
        const dmUsers = await DM.findOne({users: users})
		const isDmUser = dmUsers.every(user => user !== undefined)
		
        if(!isDmUser){
            const randomId = generateRandomNumber()
            const dm = await DM.create({
				type: "directMessage",
                users: dmUsers,
                numberId: randomId,
				
            })
            return await res.json({
                success: true,
                message: 'Dm Başarılı',
                dm: dm,
            })
        }
        return await res.json({
            success: true,
            message: 'Dm zaten var',
        })
    } catch (error) {
        console.log('Hata: ', error.message)
    }
}

module.exports = {
    userDmCreate
}