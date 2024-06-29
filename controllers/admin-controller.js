import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const addAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    
    if ( !email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "invalid inputs" });
    }
    let existingadmin;
    try {
        existingadmin=await Admin.findOne({email})
    }
    catch (err) {
        return console.log(err)
    }
    if (existingadmin) {
        return res.status(400).json({message :"already exists"})
    }
    let admin;
    const hashedpassword=bcrypt.hashSync(password)
    try {
        admin = new Admin({ email, password:hashedpassword });
        admin = await admin.save();

    } catch (err) {
        return console.log(err)
    }
    if (!admin){
        return res.status(500).json({message:"unable to store admin"})
    }
     return res.status(201).json({admin})
}
export const adminlogin = async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "invalid inputs" });
    }
    let existingadmin;
    try {
        existingadmin = await Admin.findOne({ email });

    } catch (err) {
        return console.log(err)
    }
    if (!existingadmin) {
        return res.status(400).json({ message: "admin not found" })
    }
    const ispasswordcorrect = bcrypt.compareSync(password, existingadmin.password);
    if (!ispasswordcorrect) {
        return res.status(400).json({ message: "incorrect password" })
    }
    const token = jwt.sign({ id: existingadmin._id }, process.env.SECRET_KEY, {
        expiresIn:"7d",
    });

    return res.status(200).json({ message: "authentication complete",token,id:existingadmin._id})
};
export const getadmin = async (req, res, next) => {
    let admins;
    try {
        admins=await Admin.find()
    } catch (err) {
        return console.log(err)
    }
    if (!admins) {
        return res.status(500).json({ message: "internal server error" })
    }
    return res.status(200).json({ admins })
}
