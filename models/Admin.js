import mongoose from "mongoose";

const adminschema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
         required: true
    },
    addedmovies: [{
        type: mongoose.Types.ObjectId,
        ref:"Movie",
    },
    ],
});
export default mongoose.model("Admin", adminschema);