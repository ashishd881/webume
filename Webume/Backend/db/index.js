import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        const connectionInstance  =  await mongoose.connect(`${process.env.MONGO_DB_URI}/userInfo`)
        console.log("database Connected",connectionInstance.connection.host)
    } catch (error) {
        console.log("Mopngodb Connection error",error)
    }
}

export default connectDB