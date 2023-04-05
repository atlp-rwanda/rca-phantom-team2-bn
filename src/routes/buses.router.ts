import express from "express"
import { 
    createBus, 
    deleteBusById, 
    getAllBuses, 
    getBusById, 
    updateBusById, 
    linkBusToRoute,
    getAllBusToRoutes,
} from "../controllers/buses.controller"
import { verifyToken } from "../middlewares/auth.middlewares"
import { busValidation } from "../validations/buses"
import { linkBusToRouteValidation } from "../validations/routeValidations"

const router = express.Router()

router.post("", verifyToken, busValidation, createBus)

router.put("/:busId", verifyToken, busValidation, updateBusById)

router.get("/bus/:busId", verifyToken, getBusById)

router.get("", verifyToken, getAllBuses)

router.delete("/:busId", verifyToken, deleteBusById)

router.post(
    "/link-bus-with-route",
    verifyToken,
    linkBusToRouteValidation,
    linkBusToRoute
)

router.get("/routes-assignments", verifyToken, getAllBusToRoutes)

export default router