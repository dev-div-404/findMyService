import mongoose from "mongoose";

const OfferSchema = mongoose.Schema({
   jobid : {
    type : String,
    required : true
   },
   profid :{
      type : String,
      required : true
   },
   profmsg : {
    type : String,
    required : true
   },
   profcost : {
    type : Number,
    required : true
   },
   accepted : {
      type : Boolean,
      default : false
   }
})

export default mongoose.model('offers',OfferSchema);