import mongoose, { Mongoose } from 'mongoose';

/**
 * MongoDB connection string retrieved from environment variables.
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside your environment file (.env / .env.local)'
  );
}

/**
 * Interface for the cached Mongoose connection state.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Extend the NodeJS global object type to store the cached Mongoose connection.
 * This prevents multiple connections during development caused by Next.js Hot Module Reloading (HMR).
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

/**
 * Global cache reference across hot reloads in development.
 */
let cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Connects to MongoDB using Mongoose and caches the connection instance.
 *
 * In development mode, Next.js rebuilds modules frequently, which can lead to
 * opening redundant database connections and exhausting MongoDB connection pools.
 * By caching the connection on the global object, we ensure only a single connection is maintained.
 *
 * @returns {Promise<Mongoose>} The established Mongoose instance.
 */
async function connectToDatabase(): Promise<Mongoose> {
  // 1. If a connection is already established, return the cached connection
  if (cached.conn) {
    return cached.conn;
  }

  // 2. If no connection attempt is currently in progress, initiate one
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  // 3. Await the connection promise and store the resolved connection
  try {
    cached.conn = await cached.promise;
  } catch (error: unknown) {
    // Reset the cached promise on failure so future invocations can retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectToDatabase;
export { connectToDatabase };
