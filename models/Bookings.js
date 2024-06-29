import mongoose from "mongoose";
const bookingschema = new mongoose.Schema({
     movie: {
        type: mongoose.Types.ObjectId,
        ref: "Movie",
        required:true,
    },
    
    date: {
        type: Date,
        required: true,
    },
    seatnumber: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
export default mongoose.model("Booking",bookingschema)