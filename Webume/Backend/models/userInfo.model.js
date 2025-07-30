import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    resumelink:{
        type:String,
        required:true,
    },
    
    

},{timestamp:true})

export const userInfo = mongoose.model("userInfo",userSchema)