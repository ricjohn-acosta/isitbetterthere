import mongoose from 'mongoose'

async function dbConnect() {
    // check if we have a connection to the database or if it's currently
    // connecting or disconnecting (readyState 1, 2 and 3)
    if (mongoose.connection.readyState >= 1) {
        return
    }

    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }).then((mongoose) => {
        return mongoose
    })
}

export default dbConnect


// import mongoose from 'mongoose'
//
// const MONGODB_URI = process.env.MONGODB_URI
//
// if (!MONGODB_URI) {
//     throw new Error(
//         'Please define the MONGODB_URI environment variable inside .env.local'
//     )
// }
//
// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */
// let cached = global.mongoose
//
// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null }
// }
//
// async function dbConnect() {
//     if (cached.conn) {
//         return cached.conn
//     }
//
//     if (!cached.promise) {
//         const opts = {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             bufferCommands: false,
//             bufferMaxEntries: 0,
//             useFindAndModify: false,
//             useCreateIndex: true,
//         }
//
//         cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//             return mongoose
//         })
//     }
//     cached.conn = await cached.promise
//     return cached.conn
// }
//
// export default dbConnect