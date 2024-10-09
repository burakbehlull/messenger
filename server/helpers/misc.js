const DM = require('../models/DM')
const Member = require('../models/Member')
const Message = require('../models/Message')

function RandomNumber(){
    let randomNumber = ''
    randomNumber += Math.floor(Math.random() * 8) + 1

    for (let i = 0; i < 18; i++) {
        randomNumber += Math.floor(Math.random() * 10)
    }
    return randomNumber
}

async function generateRandomNumber() {
    const randomNumber = RandomNumber()

    const member = await Member.findOne({id: randomNumber})
    const message = await Message.findOne({id: randomNumber})
    const dm = await DM.findOne({id: randomNumber})
    
    if(member || message || dm){
        return randomNumber()
    }
    
    return randomNumber
}

module.exports = {
    generateRandomNumber
}
