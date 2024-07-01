import mongoose from "mongoose";
import { DB_URL } from "../config.js";

export const connectDB = () => {
    return mongoose.connect(DB_URL)
}