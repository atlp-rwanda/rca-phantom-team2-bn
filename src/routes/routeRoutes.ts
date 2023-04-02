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

const userRouter = express.Router();

userRouter.post("/", authJwt.verifyToken, createRouteValidation, createRoute);
userRouter.get("/", authJwt.verifyToken, getAllRoutes);
userRouter.get("/:id", authJwt.verifyToken, findRouteById);
userRouter.put(
  "/:id",
  authJwt.verifyToken,
  updateRouteValidation,
  updateRouteById
);
userRouter.delete("/:id", authJwt.verifyToken, deleteRouteById);

export default userRouter;
