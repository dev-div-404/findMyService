import mongoose from "mongoose";

const JobSchema = mongoose.Schema({
    useremail : {
        type :String,
        required: true
    },
    jobtype: {
        type :String,
        required: true
    },
    jobtitle: {
        type :String,
        required: true
    },
    jobdesc: {
        type :String,
        required: true
    },
    deadline: {
        type :String,
        required: true
    },
    postdate: {
        type :String,
        required: true
    },
    location: {
        type :String,
        required: true
    },
    budget: {
        type :Number,
        required: true
    },
    phone: {
        type :Number,
        required: true
    },
    zip: {
        type :Number,
        required: true
    },
    active : {
        type : Boolean
    }
})

export default mongoose.model('jobs',JobSchema);