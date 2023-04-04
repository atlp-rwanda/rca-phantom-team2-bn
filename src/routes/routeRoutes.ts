import express from "express"
import {
    createRoute,
    findRouteById,
    updateRouteById,
    deleteRouteById,
    getAllRoutes,
} from "../controllers/routeController"
import {
    createRouteValidation,
    updateRouteValidation,
} from "../validations/routeValidations"
import { verifyToken } from "../middlewares/auth.middlewares"
import { hasPermission } from "../middlewares/roles.middlewares"
import { ModelOperation } from "../enums/permissions.enums"

const routeRouter = express.Router()

routeRouter.post(
    "/",
    verifyToken,
    createRouteValidation,
    hasPermission(ModelOperation.CREATE, "Route"),
    createRoute
)
routeRouter.get("/", verifyToken, getAllRoutes)
routeRouter.get("/:id", verifyToken, findRouteById)
routeRouter.put(
    "/:id",
    verifyToken,
    updateRouteValidation,
    hasPermission(ModelOperation.UPDATE, "Route"),
    updateRouteById
)
routeRouter.delete(
    "/:id",
    verifyToken,
    hasPermission(ModelOperation.DELETE, "Route"),
    deleteRouteById
)

export default routeRouter
