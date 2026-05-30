import mongoose from "mongoose";

const URI = process.env.MONGODB_URI!

if (!URI) {
  throw new Error("Please add your MONGODB_URI to enviroment!")
}

let cached = global.mongooseCache

if (!cached) {
  cached = global.mongooseCache = {
    conn: null,
    promise: null
  }
}

export default async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) cached.promise = mongoose.connect(URI)

  cached.conn = await cached.promise
  console.log("Connected to MongoDB");
  
  return cached.conn
}
