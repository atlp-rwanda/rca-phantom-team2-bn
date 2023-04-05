import express from "express"
import { 
    assignDriverToBus,
    createBus, 
    deleteBusById, 
    getAllBuses, 
    getBusById, 
    updateBusById,
    getBusDrivers, 
    linkBusToRoute,
    getAllBusToRoutes,
} from "../controllers/buses.controller"
import { verifyToken } from "../middlewares/auth.middlewares"
import { busValidation, assignValidation, } from "../validations/buses"
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

router.post("/assign-driver", verifyToken, assignValidation, assignDriverToBus)

router.get("/buses-drivers", verifyToken, getBusDrivers)

export default router
