import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

});
export const Avatar = mongoose.model('Avatar', avatarSchema);