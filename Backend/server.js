import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import dotenv from "dotenv";
import Donars from "./routes/Donars.js";
import Authentication from "./routes/Authentication.js";
import Request from "./routes/Request.js";

dotenv.config();
const app=express();
connectDB();

app.use(cors({
    origin:true,
    credentials:true,
    methods:['GET','PUT','POST','DELETE','PATCH','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization']
}))
app.use(express.json());
app.use(Donars);
app.use(Authentication);
app.use(Request);
app.listen(8000,()=>console.log("Server running port 8000"));