import Bookings from "../models/Bookings.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find()
    }
    catch (err) {
        return console.log(err)
    }
    if (!users) {
        return res.status(500).json({ message: "err occured" });
    }
    return res.status(200).json({ users });
};
export const singup = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "invalid inputs" });
    }
    const hashedpassword=bcrypt.hashSync(password)
    let user;
    try {
        user = new User({name,email,password:hashedpassword});
        user = await user.save();
    }
    catch (err) {
        return console.log(err);
    }
    if (!user) {
        return res.status(500).json({ message: "unexpected err occured" })
    }
    return res.status(201).json({ id:user._id })
};
export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (!name && name.trim() === "" && !email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "invalid inputs" });
    }
    const hashedpassword = bcrypt.hashSync(password)
    let user;
    try {
        user = await User.findByIdAndUpdate(id, { name, email, password: hashedpassword })
    } catch (errr) {
        return console.log(errr)
    }
    if (!user) {
        return res.status(500).json({ message: "something went wrong" })
    }
   return  res.status(200).json({ message: "update successfully" })
};
export const deletuser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete(id);
    } catch (err) {
        return console.log(err)
    }
    if (!user) {
        return res.status(500).json({ message: "something went wrong" })
    }
    return res.status(200).json({ message: "deleted successfully" })
    
};
export const login = async (req, res, next) => {
     const {  email, password } = req.body;
    if ( !email && email.trim() === "" && !password && password.trim() === "") {
        return res.status(422).json({ message: "invalid inputs" });
    }
    let existinguser;
    try {
        existinguser=await User.findOne({email})
    }
    catch (err) {
       
        return console.log(err)
    }
    if (!existinguser) {
        return res.status(404).json({ message: "unable to find user from this id" })
    }
  
    const ispasswordcorrect = bcrypt.compareSync(password, existinguser.password);
    if (!ispasswordcorrect) {
       return res.status(500).json({ message: "incorrect password" })
    }
   return res.status(200).json({ message: "login successfully" })
    
}; 
export const getbookingsofuser = async (req, res, next) => {
     const id = req.params.id;
    let bookings;
    try {
        bookings=await Bookings.find({user:id})
    }
    catch (err) {
       
        return console.log(err)
    }
    if (!bookings) {
        return res.status(500).json({ message: "unable to find this bookings" })
    }
     return res.status(200).json({  bookings })
}

    