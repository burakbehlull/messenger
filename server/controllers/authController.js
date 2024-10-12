const Member = require('../models/Member')
const { generateRandomNumber } = require('../helpers/misc')
const { isOnline } = require('../helpers/user')
const { generateRefreshToken, verifyAccessToken, verifyToken } = require('../helpers/sessions')


async function register(req,res){

    const { displayName, username, email, password } = req.body

    const user = await Member.findOne({$or: [{email: email}, {username: username}]})
	
    const generatedId = await generateRandomNumber()
	const generatedToken = await generateRefreshToken({ email: email, id: generatedId, username: username })
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
        if(!user) {
            return res.json({
                success: false,
                message: 'Kullanıcı mevcut değil',
            })
        }
        if(user.password == password){
            const isToken = await verifyAccessToken(user)
            
            return res.json({
                success: true,
                username: user.username,
                accessToken: isToken, 
            })
        } else {
            return res.json({
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
        const user = await Member.findOne({email: verify?.user?.email}).select('-password -token')
        return res.json({
            success: true,
            message: 'İşlem başarılı',
            verify: verify,
            user: user
        })
    } catch (err) {
        console.log("Hata: ", err)
        return res.json({
            success: false,
            message: 'İşlem başarısız',
            error: err.message
        })
    }
}

async function userIsOnline(req, res) {
    try { 
        const { userId, isOnline } = req.body
        const online = await isOnline(userId, isOnline)
        return await res.status(online.code).json(online)
    } catch(err){
        return await res.status().json({
            error: err.message
        })
    }
}



module.exports = {
	register,
    login,
    userVerify,
    userIsOnline
}