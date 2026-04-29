import mongoose from 'mongoose'

export const connectDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb Connected")
    } catch (error) {
        console.log("Error Connection to Mongodb")
        process.exit(1);
    }
}