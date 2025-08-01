import express from  "express"
import 'dotenv/config'
import cors from "cors"
import templateRouter from "./Routes/templateRoute.js";
import chatRouter from "./Routes/chatRoute.js";
import connectDB from "./db/index.js";
import {clerkMiddleware} from "@clerk/express"
import pdfRouter from "./Routes/pdfRoute.js";


const app = express()
app.use(express.json())
app.use(cors())
connectDB()
app.use(clerkMiddleware( {
        publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
        secretKey: process.env.CLERK_SECRET_KEY
}))

const PORT = process.env.PORT || 4000
app.use('/api/template',templateRouter)     //http://localhost:4000/api/template/runtemplate
app.use('/api/chat',chatRouter)             ////http://localhost:4000/api/chat/runchat
app.use('/api/pdfparser',pdfRouter)             //http://localhost:4000/api/pdfparser/runpdfparser
app.get('/',(req,res)=> res.send("Your API Working"))

app.listen(PORT,()=>console.log("server is running on port"+ PORT))