import express from "express";
import bcrypt from "bcrypt";
import DonarsSchema from "../models/DonarsSchema.js";
const router=express.Router();

router.post("/api/donars",async(req,res)=>{
    try{
    const {name,DOB,bloodGroup,phone,email,password,city,state,country,lastDonateDate}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    const donar=new DonarsSchema({
        name,
        DOB,
        bloodGroup,
        phone,
        email,
        password:hashedPassword,
        city,
        state,
        country,
        lastDonateDate
    })
    await donar.save();
    res.status(201).json(donar);
}
catch(error){
    res.status(500).json({message:error.message});
}

})
router.get("/api/donars",async (req,res)=>{
    try{
        const donars=await DonarsSchema.find();
        res.status(200).json(donars);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})
router.get('/api/donars/:id',async(req,res)=>{
    try{
        const donar=await DonarsSchema.findById(req.params.id);
        res.status(200).json(donar);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})
router.patch('/api/donar/:id',async(req,res)=>{
    try{
        const{name,DOB,bloodGroup,phone,email,password,city,state,country,lastDonateDate}=req.body;
        const donar=await DonarsSchema.findByIdAndUpdate(req.params.id,{
            name,
            DOB,
            bloodGroup,
            phone,
            email,
            password,
            city,
            state,
            country,
            lastDonateDate
        })
        res.status(200).json(donar);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})
router.delete('/api/donar/:id',async(req,res)=>{
    try{
        const donar=await DonarsSchema.findByIdAndDelete(req.params.id);
        res.status(200).json(donar);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})
router.get('/api/donar/:bloodGroup',async(req,res)=>{
    try{
        const donar=await DonarsSchema.find({bloodGroup:req.params.bloodGroup})
        res.status(200).json(donar);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})
router.get('/api/donar/:city',async(req,res)=>{
    try{
        const donar=await DonarsSchema.find({city:req.params.city})
        res.status(200).json(donar);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

export default router;