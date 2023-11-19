import mongoose from "mongoose";

const ProfNotificationSchema = mongoose.Schema({
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
    }
})

export default mongoose.model('profNotification',ProfNotificationSchema);