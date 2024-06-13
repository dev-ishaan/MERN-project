const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/";

const connectToMongo = async () =>{
    // mongoose.connect(mongoURI);
    // console.log("connected to mongo");
    mongoose.connect(mongoURI).then(()=>console.log("connected to mongo")).catch((e)=>console.log(e.message))
}

module.exports = connectToMongo;