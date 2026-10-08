import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("Missing MONGODB_URI in environment variables.");
}

export const client = new MongoClient(mongoUri);
export const db = client.db();
export default client;

