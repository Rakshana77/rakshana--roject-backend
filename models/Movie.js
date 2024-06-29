import mongoose from "mongoose";

const movieschema = new mongoose.Schema({
   
    title: {
        type: String,
        required: true,
    },
    description: {
        
        type: String,
        required: true,
    
    },
    releasedate: {
        type: Date,
        required: true,
    },
    posterurl: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
    },
    bookings: [{
        type: mongoose.Types.ObjectId,
    ref:"Booking",}],
    admin: {
        type: mongoose.Types.ObjectId,
        ref:"Movie",
        required: true,
    },


});
export default mongoose.model("movie",movieschema)