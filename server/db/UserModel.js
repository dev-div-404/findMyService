import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name : {
        type :String,
        required: true
    },
    phone : {
        type : Number,
        unique : true,
        required : true
    },
    email :{
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    zip : {
        type : Number,
        required : true
    }
})

export default mongoose.model('users',UserSchema);