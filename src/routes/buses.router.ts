import express from "express"
import { createBus } from "../controllers/buses.controller"
import { verifyToken } from "../middlewares/auth.middlewares"

const router = express.Router()

router.post("", verifyToken, createBus)

export default router