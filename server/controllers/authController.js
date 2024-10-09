const Member = require('../models/Member')
const { generateRandomNumber } = require('../helpers/misc')

async function register(req,res){
    const { displayName, username, email, password } = req.body
    const user = await Member.findOne({$or: [{email: email}, {username: username}]})
	const generatedId = await generateRandomNumber()
	
    if(!user){
		await Member.create({
            displayName: displayName,
            username: username,
            email: email,
            password: password,
			id: generatedId
        })
        return await res.json({
            message: 'Kullanıcı başarıyla oluşturuldu.'
        })
        
    }
	return await res.json({
		message: 'Bu kullanıcı zaten var.'
    })
}

async function login(req,res){
    const { email, password } = req.body
    try {
        const user = await Member.findOne({email: email})
        if(user == undefined || user == null) {
            res.json({
                success: false,
                message: 'Kullanıcı mevcut değil',
            })
        }
        if(user.password == password){
            res.json({
                success: true,
                username: user.username,
            })
        } else {
            res.json({
                success: false,
                message: "Şifre yanlış"
            })
        }
    } catch (err) {
        return {
            success: false,
            message: "Hata",
            error: err
        }
    
    }
}

module.exports = {
	register,
    login
}