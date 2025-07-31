import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        // console.log(process.env.MONGO_DB_URI)
        const connectionInstance  =  await mongoose.connect(`${process.env.MONGO_DB_URI}/userInfo`)
        console.log("database Connected",connectionInstance.connection.host)
    } catch (error) {
        console.log("Mongodb Connection error",error)
    }
}

export default connectDB