import express from "express";
import {
  createRoute,
  findRouteById,
  updateRouteById,
  deleteRouteById,
  getAllRoutes,
} from "../controllers/routeController";
import {
  createRouteValidation,
  updateRouteValidation,
} from "../validations/routeValidations";
import authJwt from "../middleware/auth";

const routeRouter = express.Router();

routeRouter.post("/", authJwt.verifyToken, createRouteValidation, createRoute);
routeRouter.get("/", authJwt.verifyToken, getAllRoutes);
routeRouter.get("/:id", authJwt.verifyToken, findRouteById);
routeRouter.put(
  "/:id",
  authJwt.verifyToken,
  updateRouteValidation,
  updateRouteById
);
routeRouter.delete("/:id", authJwt.verifyToken, deleteRouteById);

export default routeRouter;
