import express from "express"
import {
    assignDriverToBus,
    createBus,
    deleteBusById,
    getAllBuses,
    getBusById,
    getBusDrivers,
    updateBusById,
} from "../controllers/buses.controller"
import { verifyToken } from "../middlewares/auth.middlewares"
import { assignValidation, busValidation } from "../validations/buses"

const router = express.Router()

router.post("", verifyToken, busValidation, createBus)

router.put("/:busId", verifyToken, busValidation, updateBusById)

router.get("/bus/:busId", verifyToken, getBusById)

router.get("", verifyToken, getAllBuses)

router.delete("/:busId", verifyToken, deleteBusById)

router.post("/assign-driver", verifyToken, assignValidation, assignDriverToBus)

router.get("/buses-drivers", verifyToken, getBusDrivers)

export default router
