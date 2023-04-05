import express from "express"
import { 
    createBus, 
    deleteBusById, 
    getAllBuses, 
    getBusById, 
    updateBusById, 
} from "../controllers/buses.controller"
import { verifyToken } from "../middlewares/auth.middlewares"
import { busValidation } from "../validations/buses"

const router = express.Router()

router.post("", verifyToken, busValidation, createBus)

router.put("/:busId", verifyToken, busValidation, updateBusById)

router.get("/bus/:busId", verifyToken, getBusById)

router.get("", verifyToken, getAllBuses)

router.delete("/:busId", verifyToken, deleteBusById)

export default router