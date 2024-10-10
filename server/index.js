const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

require('dotenv').config()
require('./config/db').db()

const { dmRoute, messageRoute, authRoute } = require('./routers')


const app = express()
const PORT = process.env.PORT || 80

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cors({
	origin: true,
	credentials: true
}))

app.use(morgan('dev'))

app.get('/', (req,res)=> {
    res.send('Hello Messenger!')
})

app.use('/auth', authRoute)
app.use('/dm', dmRoute)
app.use('/message', messageRoute)

app.listen(PORT, ()=> {
	console.log(`Api, ${PORT} portunda başlatıldı.`)
})