import express from "express";
import bcrypt from 'bcrypt';
import User from "../models/Users.js";
const router = express.Router();

router.post("/api/register", async(req, res) => {
    try{
    const { name, DOB, bloodGroup, phone, email, password, city, state, country } = req.body;
    if (!name || !DOB || !bloodGroup || !phone || !email || !password || !city || !state || !country) {
        return res.status(400).send("All fields are required");
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
        name,
        DOB,
        bloodGroup,
        phone,
        email,
        password: hashedPassword,
        city,
        state,
        country
    })
    await user.save();
    res.send("User registered");
    }
    catch(error){
        res.status(500).send("Internal server error");
    }
});
router.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found");
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid password");
        }
        res.send("User logged in");
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }
})
router.get("/api/profiles", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);

  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
router.get("/api/profile/:email", async (req, res) => {
    try {

        const { email } = req.params;
        if (!email) {
            return res.status(400).send("Email is required");
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found");
        }
        res.send(user);
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }
})
router.patch("/api/profileUpdate", async (req, res) => {
    try {
        const { name, DOB, bloodGroup, phone, email, city, state, country } = req.body;

        const user = await User.findOneAndUpdate({ email }, {
            name,
            DOB,
            bloodGroup,
            phone,
            email,
            city,
            state,
            country
        })
        res.send(user);
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }

})

export default router;