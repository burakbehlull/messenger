const Member = require('../models/Member')
const { generateRandomNumber } = require('../helpers/misc')

async function register(req,res){
    const { displayName, username, email, password } = req.body
    const user = await Member.findOne({$or: [{email: email}, {username: username}]})
	const generatedId = generateRandomNumber()
	
    if(!user){
		await User.create({
            displayName: displayName,
            username: username,
            email: email,
            password: password,
			userId: generatedId
        })
        return await res.json({
            message: 'Kullanıcı başarıyla oluşturuldu.'
        })
        
    }
	return await res.json({
		message: 'Bu kullanıcı zaten var.'
    })
}


module.exports = {
	register
}