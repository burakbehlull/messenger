const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 80

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cors({
	origin: true,
	credentials: true
}))

app.get('/', (req,res)=> {
    res.send('Hello Messenger!')
})


app.listen(PORT, ()=> {
	console.log(`Api, ${PORT} portunda başlatıldı.`)
})