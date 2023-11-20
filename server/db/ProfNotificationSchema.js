import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema({
    profemail : {
        type: String,
        required : true,
    },
    text : {
        type : String,
        required : true,
    },
    link : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        required : true,
    }
})

export default mongoose.model('notification',NotificationSchema);