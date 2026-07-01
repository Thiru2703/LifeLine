import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    DOB:{type:Date,required:true},
    bloodGroup:{type:String,required:true},
    phone:Number,
    email:String,
    password:String,
    city:String,
    state:String,
    country:String,
    lastDonateDate:Date
})

export default mongoose.model("User",userSchema);