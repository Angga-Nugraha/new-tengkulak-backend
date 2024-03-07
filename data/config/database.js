import mongoose from "mongoose";

export const connectDb = async () => {
    // await mongoose.connect(`mongodb+srv://anggaaanugraha74:Anggaa7x@cluster0.itpqqrk.mongodb.net/?retryWrites=true&w=majority`);
    await mongoose.connect(`mongodb://127.0.0.1:27017/tengkulak_db`);
};
