import express from "express"
import { chat } from "../controller/chatController.js";

const chatRouter = express.Router();
chatRouter.post("/runchat",chat)

export default chatRouter