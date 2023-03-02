import express from 'express'
import {getSales} from "../controllers/sales.js"

const router = express.Router()

// Going to use all the same endpoints since were using the same pieces of data
router.get("/sales", getSales)

export default router;