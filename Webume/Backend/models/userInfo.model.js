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
    resumeData:{
        type:String,
        
    },
    
    

},{timestamp:true})

export const userInfo = mongoose.model("userInfo",userSchema)