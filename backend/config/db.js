import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ployiiv:420793@cluster0.xzhmymk.mongodb.net/food-delivery').then(() => console.log("Database connected"))
}