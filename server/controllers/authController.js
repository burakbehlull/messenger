const Member = require('../models/Member')
const { generateRandomNumber } = require('../helpers/misc')
const { generateRefreshToken, verifyAccessToken, verifyToken } = require('../helpers/sessions')

async function register(req,res){

    const { displayName, username, email, password } = req.body

    const user = await Member.findOne({$or: [{email: email}, {username: username}]})
	
    const generatedId = await generateRandomNumber()
	const generatedToken = await generateRefreshToken({ email: email, id: generatedId, username: username })
    console.log(generatedToken)
    if(!user){
		await Member.create({
            displayName: displayName,
            username: username,
            email: email,
            password: password,
			id: generatedId,
            token: generatedToken
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
            const isToken = await verifyAccessToken(user)
            
            res.json({
                success: true,
                username: user.username,
                accessToken: isToken, 
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

async function userVerify(req,res){
    const { token } = req.body
    try {
        if(!token) return res.json({
            success: true,
            message: 'Lütfen token yazınız.'
        })

        const verify = await verifyToken(token)
        if(!verify){
            return res.json({
                success: true,
                message: 'Token boş'
            })
        }
        console.log(verify)
        const user = await Member.findOne({email: verify?.user?.email}).select('-password')
        console.log(user)
        return res.json({
            success: true,
            message: 'İşlem başarılı',
            verify: verify,
            user: user
        })
    } catch (err) {
        console.log(err)
        return res.json({
            success: false,
            message: 'İşlem başarısız',
            error: err.message
        })
    }
}

module.exports = {
	register,
    login,
    userVerify
}