function generateRandomNumber() {
    let randomNumber = ''
    
    randomNumber += Math.floor(Math.random() * 8) + 1
    
    for (let i = 0; i < 18; i++) {
        randomNumber += Math.floor(Math.random() * 10)
    }
    
    return randomNumber
}

module.exports = {
    generateRandomNumber
}
