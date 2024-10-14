const DM = require('../models/DM')
const Member = require('../models/Member')
const Message = require('../models/Message')
const { generateRandomNumber } = require('./misc')

async function ShowDm(dmId, userId, isShow){
    try {
        
        if(isShow){
            const dm = await DM.findById({_id: dmId})
            dm.invisible.push(userId)
            await dm.save()
            return {
                success: true,
                data: dm
            }
        } else {
            const dm = await DM.findById({_id: dmId})
            dm.invisible = dm.invisible.filter(i => i.toString() !== userId.toString())
            await dm.save()
            return {
                success: true,
                data: dm
            }
        }
    } catch(err){
        return {
            success: false,
            error: err.message
        }
    }
}

async function CreateDm(users){
    try {
        const members = await Member.find({ _id: { $in: users } }).select('-password')
        
        if (members.length !== users.length) return {
            success: false,
            code: 404,
            message: 'Bir veya daha fazla kullanıcı bulunamadı',
        }
        

        const existingDm = await DM.findOne({ users: { $all: users } })
        if (existingDm) return {
            success: true,
            error: 'DM zaten var',
            code: 200,
            data: existingDm,
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
            invisible: users,
        })

        return {
            success: true,
            message: 'DM başarıyla oluşturuldu',
            dm: newDm,
            code: 201
        }

    } catch(err){
        return {
            success: false,
            message: 'Başarısız',
            error: err.message
        }
    }
}

async function GetDmMessages(dmId){
    try {
        const dm = await DM.findById(dmId)
        if (!dm) return {
            success: false,
            message: 'DM bulunamadı',
            code: 404
        }

        const messages = await Message.find({ dmId: dmId }).sort({ timestamp: 1 })

        return {
            success: true,
            messages: messages,
            code: 200
        }
    } catch(err){
        return {
            success: false,
            message: 'Hata.',
            error: err.message,
            code: 500
        }
    }
}

async function GetDms(userId) {
    try {
        const dms = await DM.find({ invisible: { $ne: userId } })
            .populate('users', 'displayName') 
            .exec()

        if (!dms || dms.length === 0) {
            return {
                success: false,
                message: 'DM bulunamadı',
                code: 404
            };
        }

        const processedDms = dms.map(dm => {
            const otherUser = dm.users.find(user => user._id.toString() !== userId.toString())
            const dmName = otherUser ? otherUser.displayName : 'Unknown User';

            return {
                ...dm.toObject(),
                dmName: dmName
            }
        })

        return {
            success: true,
            dms: processedDms,
            code: 200
        };
    } catch (err) {
        return {
            success: false,
            message: 'Hata.',
            error: err.message,
            code: 500
        }
    }
}

module.exports = {
    ShowDm,
    CreateDm,
    GetDmMessages,
    GetDms,
}