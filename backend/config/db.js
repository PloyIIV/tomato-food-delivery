import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const MONGOOSE_PASSWORD = process.env.MONGOOSE_PASSWORD
export const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://ployiiv:${MONGOOSE_PASSWORD}@cluster0.xzhmymk.mongodb.net/food-delivery`).then(() => console.log("Database connected"))
}