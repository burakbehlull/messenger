const Message = require('../models/Message')
const { generateRandomNumber } = require('../helpers/misc')

async function messageCreate(req, res){
    try {
        const { buyerUser, senderUser, content, dmId } = req.body
		
        const generatedId = await generateRandomNumber()
		
        if(!buyerUser || !senderUser || !dmId || !content) return
		
        const message = await Message.create({
			buyerUser: {
				id: buyerUser,
				username: buyerUser.username,
				displayName: buyerUser.displayName
			},
			senderUser: {
				id: senderUser.id,
				username: senderUser.username,
				displayName: senderUser.displayName
			},
            dmId: dmId,
            content: content,
            id: generatedId
            
        }) 
        return await res.json({
            success: true,
            message: 'Mesaj gönderildi',
            data: message
        })
    } catch (error) {
        console.log('Hata: ', error.message)
        return await res.json({
            success: false,
            message: 'Başarısız',
            error: error.message
        })
    }
}

module.exports = {
    messageCreate
}