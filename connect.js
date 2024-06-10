const mongoose = require("mongoose");

async function connectMongooseDb(url){
    return mongoose.connect(url)
}

module.exports ={
    connectMongooseDb
}