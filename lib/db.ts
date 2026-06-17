import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null; // active connection
  promise: Promise<typeof mongoose> | null; //connection attempt in progress
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_ATLAS_URI;
// checks db address exists at module load time
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

// caching for local development
// checks if a property named mongoose (global.mongoose) exists on node.js's global object, if yes re-use it
let cached: MongooseCache = global.mongoose as MongooseCache;

if (!cached) {
  // if global.mongoose does not exist, create a new one that includes connection and a promise, and store it on Node.js's global object.
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn; //if already connected re-use it
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false, //if no connection, throws an error immediately
    }); // starts connecting and stored the attempt
  }

  cached.conn = await cached.promise; //wait for connection to finish
  return cached.conn;
}
