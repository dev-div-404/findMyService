import mongoose from "mongoose";

const ProfSchema = mongoose.Schema({
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
    },
    jobtype : {
        type : String,
        required : true
    }
})

export default mongoose.model('professonals',ProfSchema);