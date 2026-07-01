import mongoose from "mongoose";


const donarsSchema=new mongoose.Schema({
    name:{type:String,required:true},
    DOB:Date,
    bloodGroup:String,
    phone:Number,
    email:String,
    password:String,
    city:String,
    state:String,
    country:String,
    lastDonateDate:Date
})

export default mongoose.model("donar",donarsSchema);