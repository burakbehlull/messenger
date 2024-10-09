const mongoose = require("mongoose")

async function db(){
	const conn = await mongoose.connect(process.env.MONGO_URI)
	.then(()=> console.log("Bağlantı başarılı"))
	.catch((err)=> console.log("Hata: ", err.message))
	return conn
}
module.exports = {
	db
}