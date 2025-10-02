import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";
// This variable will now only be used for local development
const MONGODB_NAME = process.env.MONGODB_NAME || "";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Caching the connection is a best practice in serverless environments.
let cached = (global as any).mongoose;
if (!cached) {
    (global as any).mongoose = { conn: null, promise: null };
    cached = (global as any).mongoose;
}

export async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        // --- THIS IS THE KEY CHANGE ---
        // Start with an empty options object.
        const opts: { dbName?: string } = {};

        // If MONGODB_NAME is defined (i.e., you are running locally),
        // add the dbName property to the options.
        // If it's not defined (i.e., you are deployed), this block is skipped.
        if (MONGODB_NAME) {
            opts.dbName = MONGODB_NAME;
        }

        // Now, mongoose.connect is called with the correct options for each environment.
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
