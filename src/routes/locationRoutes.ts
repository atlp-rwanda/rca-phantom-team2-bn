import express from "express"
import { verifyToken } from "../middlewares/auth.middlewares"
import {
    createLocationValidation,
    updateLocationValidation,
} from "../validations/locationValidations"
import {
    createLocation,
    deleteLocationById,
    findLocationById,
    getAllLocations,
    updateLocationById,
} from "../controllers/locationController"
import { hasPermission } from "../middlewares/roles.middlewares"
import { ModelOperation } from "../enums/permissions.enums"

const locationRouter = express.Router()

locationRouter.post(
    "/",
    verifyToken,
    createLocationValidation,
    hasPermission(ModelOperation.CREATE, "Location"),
    createLocation
)
locationRouter.get("/", verifyToken, getAllLocations)
locationRouter.get("/:id", verifyToken, findLocationById)
locationRouter.put(
    "/:id",
    verifyToken,
    updateLocationValidation,
    hasPermission(ModelOperation.UPDATE, "Location"),
    updateLocationById
)
locationRouter.delete(
    "/:id",
    verifyToken,
    hasPermission(ModelOperation.DELETE, "Location"),
    deleteLocationById
)

export default locationRouter
