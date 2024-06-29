import jwt  from "jsonwebtoken"
import Movie from "../models/Movie.js";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
export const addmovie = async (req, res, next) => {
    const extractedtoken = req.headers.authorization.split(" ")[1];
    if (!extractedtoken && extractedtoken.trim() === "") {
        return res.status(404).json({ message: "token not found" })
    }
    console.log(extractedtoken);

    let adminid;
    jwt.verify(extractedtoken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` })
        }
        else {
            adminid = decrypted.id;
            return
        }
    });
    const { title, description, releasedate, posterurl, featured, } = req.body;
    if (!title && title.trim() === "" && !description && description.trim() === "" && !posterurl && posterurl.trim() === "") {
        return res.status(400).json({ message: "invalid inputs" })
    }
    let movie;
    try {
        movie = new Movie({ title, description, releasedate: new Date(`${releasedate}`), featured, admin: adminid, posterurl, });
        const session = await mongoose.startSession();
        const adminuser = await Admin.findById(adminid);
        session.startTransaction();
        await movie.save({ session });
        adminuser.addedmovies.push(movie);
        await adminuser.save({session});
        await session.commitTransaction();
       
    }
    catch (err) {
        console.log(err)
    }
    if (!movie) {
        return res.status(500).json({ message: "request failed" })
    }
    return res.status(200).json({ movie })
};
export const getallmovies = async (req, res, next) => {
    let movies;
    try {
        movies = await Movie.find();
       
    }
 catch (error) {
        console.error(error)
    };
    if (!movies) {
         return res.status(404).json({ message: "request failed" });
    }

        return res.status(200).json({ movies});
     


};
export const getmoviesbyid = async (req, res, next) => {
    const id = req.params.id;
    let movie;
    try {
        movie = await Movie.findById(id);

    }
    catch (err) {
        return console.log(err)
    }
    if (!movie) {
        return res.status(404).json({ message: "invalid movies id" });
    }

    return res.status(200).json({ movie });
};
