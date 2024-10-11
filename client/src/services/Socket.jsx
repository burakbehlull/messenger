import io from 'socket.io-client'
const socketUri = import.meta.env.VITE_SOCKET_URI || "http://localhost:80";

// exp
import React, { createContext, useContext } from 'react'
const SocketContext = createContext()

class Socket {
	constructor(){
		this.socket = useContext(SocketContext)
	}
	Provider({children}){
		const socket = io(socketUri,{
			transports: ["websocket"]
		})
		return (
			<SocketContext.Provider value={socket}>
				{children}
			</SocketContext.Provider>
		)
	}
	
	status(){
		this.socket.on('connection', ()=>{
			console.log('Kullanıcı bağlandı.')
		})

		this.socket.on('disconnect', ()=>{
			console.log('Kullanıcı ayrıldı.')
		})
	}
	
	send(key, value){
		
		this.socket.emit(key, value)
	}
	sign(name, func){
		this.socket.on(name, (...props)=> func(...props))
	}
}

export {
	Socket
}