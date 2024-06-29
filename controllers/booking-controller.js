import mongoose from "mongoose";
import Bookings from "../models/Bookings.js";
import Movie    from "../models/Movie.js";
import User from "../models/User.js";
export const newbooking = async (req, res, next) => {
    const { movie, date, seatnumber, user } = req.body;

    let existingMovie;
    let existingUser;
    try {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user)
    }
    catch (err) {
        return console.log(err)
    }
    if (!existingMovie) {
        return res.status(404).json({ message: "movie not found with giiven id" })
    }
    if (!existingUser) {
        return res.status(404).json({ message: "user not found" })
    }
    let booking;
    try {
        booking = new Bookings({
            movie,
            date: new Date(`${date}`), seatnumber, user,
        });
        const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking);
        existingMovie.bookings.push(booking);
        await existingUser.save({ session })
        await existingMovie.save({ session });
        await booking.save({ session })
        session.commitTransaction();

       
    }
    catch (err) {
        return console.log(err)
    }
    if (!booking) {
        return res.status(500).json({ message: "unable to create" })
    }
    return res.status(200).json({ booking })
};
export const getbookingbyid = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking=await Bookings.findById(id)
     } catch (err) {
        return console.log(err)
    }
     if (!booking) {
        return res.status(500).json({ message: "unexpected error" })
    }
     return res.status(200).json({ booking})

}
export const deletebooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Bookings.findByIdAndRemove().populate("user movie");
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({ session });
        await booking.user.save({ session });
        session.commitTransaction()

     } catch (err) {
        return console.log(err)
    }
     if (!booking) {
        return res.status(500).json({ message: "unexpected delete" })
    }
     return res.status(200).json({ message:"successfully deleted"})

}

