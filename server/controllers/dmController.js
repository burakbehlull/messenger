const DM = require('../models/DM')
const Member = require('../models/Member')
const Message = require('../models/Message')
const { generateRandomNumber } = require('../helpers/misc')

async function userDmCreate(req, res) {
    try {
        const { users } = req.body

        if (!users || !Array.isArray(users) || users.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Kullanıcılar geçersiz',
            })
        }

        const members = await Member.find({ _id: { $in: users } })
        if (members.length !== users.length) {
            return res.status(400).json({
                success: false,
                message: 'Bir veya daha fazla kullanıcı bulunamadı',
            })
        }

        const existingDm = await DM.findOne({ users: { $all: users } })
        
        if (existingDm) {
            return res.json({
                success: true,
                message: 'DM zaten var',
                dm: existingDm,
            })
        }
        const dmUsers = members.map((user)=> {
            return `${user.username},`
        }) 
        const randomId = await generateRandomNumber()
        const newDm = await DM.create({
            name: `${dmUsers}`,
            type: "directMessage",
            users: users,
            id: randomId,
        })

        return res.json({
            success: true,
            message: 'DM başarıyla oluşturuldu',
            dm: newDm,
        })
    } catch (error) {
        console.log('Hata: ', error.message);
        return res.status(500).json({
            success: false,
            message: 'Bir hata oluştu',
        })
    }
}

async function getDmMessages(req, res) {
    try {
        const { dmId } = req.params

        const dm = await DM.findById(dmId)
        if (!dm) {
            return await res.status(404).json({
                success: false,
                message: 'DM bulunamadı',
            })
        }

        const messages = await Message.find({ dmId: dmId }).sort({ timestamp: 1 })

        return res.json({
            success: true,
            messages: messages,
        });
    } catch (err) {
        console.log('Hata: ', err.message);
        return await res.status(500).json({
            success: false,
            message: 'Bir hata oluştu',
        })
    }
}

module.exports = {
    userDmCreate,
    getDmMessages
}
