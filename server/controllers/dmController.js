const { ShowDm, CreateDm, GetDmMessages, GetDms } = require('../helpers/dm')



async function userDmCreate(req, res) {
    try {
        const { users } = req.body

        if (!users || !Array.isArray(users) || users.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Kullanıcılar geçersiz',
            })
        }
        const result = await CreateDm(users)
        
        return res.status(result.code).json(result)

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

        const result = await GetDmMessages(dmId)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log('Hata: ', err.message);
        return await res.status(500).json({
            success: false,
            message: 'Bir hata oluştu',
        })
    }
}

async function getDms(req, res) {
    try {
        const { userId } = req.params

        const result = await GetDms(userId)
        return res.status(result.code).json(result)
    } catch (err) {
        console.log('Hata: ', err.message);
        return await res.status(500).json({
            success: false,
            message: 'Bir hata oluştu',
        })
    }
}

async function showDm(req, res) {
    try {
        const { dmId, userId, isShow } = req.body

        const result = await ShowDm(dmId, userId, isShow)
        if (result.error) {
            return await res.status(404).json({
                success: false,
                message: 'DM bulunamadı',
            })
        }
        return res.json({
            success: true,
            data: result.data,
        })
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
    getDmMessages,
    getDms,
    showDm
}
