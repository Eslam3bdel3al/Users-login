const mongoos = require("mongoose")

const usrScema = new mongoos.Schema({
    _id:{
        type:Number,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:Number,
    phone:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        required:true
    }
})

module.exports = mongoos.model("users",usrScema);