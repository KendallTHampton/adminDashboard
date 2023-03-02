// Controllers are a common pattern used to organize this code, and they are typically used to handle specific types of requests, or to perform specific actions.A controller is a set of functions that handle specific routes or endpoints in your application.

import express from 'express'
import {getUser} from "../controllers/general.js";
import {getDashboardStats} from '../controllers/general.js';


const router = express.Router()

router.get("/user/:id", getUser)
router.get("/dashboard", getDashboardStats)


export default router;