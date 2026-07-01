import express from "express";
import RequestModel from "../models/Request.js";
import DonarsSchema from "../models/DonarsSchema.js";

const router=express.Router();


router.post("/api/request",async(req,res)=>{
    try{
        const{patientName,bloodGroup,units,hospitalName,contactPerson,phone,requiredDate}=req.body;
        const request=new RequestModel({
            patientName,
            bloodGroup,
            units,
            hospitalName,
            contactPerson,
            phone,
            requiredDate
        });
        await request.save();
        res.status(201).json({message:"Request created successfully"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
})
router.get("/api/request",async(req,res)=>{
    try{
        const requests=await RequestModel.find({status: "Pending"});
        res.status(200).json(requests);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})
router.patch("/api/request/:id/respond",async(req,res)=>{
    try{
        const{id}=req.params;
        const request=await RequestModel.findByIdAndUpdate(id,{status:"Completed"});
        res.status(200).json({message:"Request responded successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})
router.get("/api/request/:id",async(req,res)=>{
    try{
        const{id}=req.params;
        const request=await RequestModel.findById(id);
        res.status(200).json(request);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})
router.patch("/api/request/:id",async(req,res)=>{
    try{
        const{id}=req.params;
        const{patientName,bloodGroup,units,hospitalName,contactPerson,phone,requiredDate}=req.body;
        const request=await RequestModel.findByIdAndUpdate(id,{
            patientName,
            bloodGroup,
            units,
            hospitalName,
            contactPerson,
            phone,
            requiredDate
        });
        res.status(200).json({message:"Request updated successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})
router.delete("/api/request/:id",async(req,res)=>{
    try{
        const{id}=req.params;
        await RequestModel.findByIdAndDelete(id);
        res.status(200).json({message:"Request deleted successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})
router.get("/api/dashboard/stats", async (req, res) => {
  try {
    const totalDonors = await DonarsSchema.countDocuments();

    const totalRequests = await RequestModel.countDocuments();

    const completedRequests = await RequestModel.countDocuments({
      status: "Completed"
    });

    const livesSaved = completedRequests * 2;

    res.status(200).json({
      totalDonors,
      totalRequests,
      completedDonations: completedRequests,
      livesSaved
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

export default router;