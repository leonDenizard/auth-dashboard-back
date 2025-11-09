import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI as string;

export async function connectDB() {
	try {
		await mongoose.connect(mongoURI);
		console.log("✅  Database connected");
	} catch (error) {
		console.log("X Error to connect database X", error);
		process.exit(1);
	}
}