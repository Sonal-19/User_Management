const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type: String,
        default: null,
    },
},{
    timestamps:true
});

const register = mongoose.model('Register', registerSchema);

module.exports = register;
