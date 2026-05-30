import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_ATLAS_URI;
// check URI at module load time
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

// caching for local development
// if global.mongoose exists re-use it
let cached: MongooseCache = global.mongoose as MongooseCache;

if (!cached) {
  // if global.mongoose does not exist, create a new one that includes connection and a promise, and store it on Node.js's global object.
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
