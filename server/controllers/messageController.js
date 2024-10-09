const Message = require('../models/Message')
const { generateRandomNumber } = require('../helpers/misc')

async function messageCreate(req, res){
    try {
        const { buyerUserId, senderUserId, content, dmId } = req.body
        const generatedId = await generateRandomNumber()
        if(!buyerUserId || !senderUserId || !dmId) return
        const message = await Message.create({
            buyerUserId: buyerUserId,
            senderUserId: senderUserId,
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