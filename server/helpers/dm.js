const DM = require('../models/DM')

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

module.exports = {
    ShowDm
}