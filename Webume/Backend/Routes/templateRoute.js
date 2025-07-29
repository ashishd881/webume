import express from 'express'
import { template } from '../controller/templateController.js'

const templateRouter  = express.Router()       

templateRouter.post('/runtemplate',template)

export default templateRouter   