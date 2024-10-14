const express = require('express')
const http = require('http')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

require('dotenv').config()
require('./config/db').db()

const { dmRoute, messageRoute, authRoute } = require('./routers')


const PORT = process.env.PORT || 80

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cors({
	origin: '*', 
    methods: ['GET', 'POST'],
    credentials: true
}))

app.use(morgan('dev'))

io.on('connection', (socket) => {
	console.log('bağlandı', socket.id)
	
	socket.on("disconnect", (user)=> {
		
		console.log('serverdan ayrıldı', user.id)
	})
})

app.get('/', async (req,res)=> {
    res.send(`Hello Messenger!`)
})
app.use('/auth', authRoute)
app.use('/dm', dmRoute)
app.use('/message', messageRoute)

server.listen(PORT, ()=> {
	console.log(`Api, ${PORT} portunda başlatıldı.`)
})