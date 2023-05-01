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
import { ModelOperation } from "../enums/permissions.enums"
import { verifyToken } from "../middlewares/auth.middlewares"
import { hasPermission } from "../middlewares/roles.middlewares"
import { busValidation, assignValidation, } from "../validations/buses"
import { linkBusToRouteValidation } from "../validations/routeValidations"

const router = express.Router()

router.post("", verifyToken, busValidation, hasPermission(ModelOperation.CREATE, "Bus"), createBus)

router.put("/:busId", verifyToken, busValidation, hasPermission(ModelOperation.UPDATE, "Bus"), updateBusById)

router.get("/bus/:busId", verifyToken, getBusById)

router.get("", verifyToken, getAllBuses)

router.delete("/:busId", verifyToken, hasPermission(ModelOperation.DELETE, "Bus"), deleteBusById)

router.post(
    "/link-bus-with-route",
    verifyToken,
    linkBusToRouteValidation,
    hasPermission(ModelOperation.CREATE, "Route"),
    linkBusToRoute
)

router.get("/routes-assignments", verifyToken, getAllBusToRoutes)

router.post("/assign-driver", verifyToken, assignValidation, hasPermission(ModelOperation.CREATE, "Bus"), assignDriverToBus)

router.get("/buses-drivers", verifyToken, getBusDrivers)

export default router
