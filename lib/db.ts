import mongoose from "mongoose";
import assert from "node:assert";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

// caching for local development
// if global.mongoose exists re-use it
let cached: MongooseCache = global.mongoose as MongooseCache;

if (!cached) {
  // if global.mongoose does not exist, create a new one that includes connection and a promise, and store it on Node.js's global object.
  cached = global.mongoose = { conn: null, promise: null };
}

export async function makeSureDbIsReady() {
  // if connection exists return connection
  if (cached.conn) {
    return cached.conn;
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  assert(
    MONGODB_URI,
    "Please define the MONGODB_URI environment variable inside .env.local",
  );

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
