const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/my-notebook"; // my-notebook is database name

const connectToMongo = async () =>{
    mongoose.connect(mongoURI).then(()=>console.log("connected to mongo")).catch((e)=>console.log(e.message))
}

module.exports = connectToMongo;