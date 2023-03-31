import express from "express";
import { createRoute, findRouteById, updateRouteById, deleteRouteById, getAllRoutes } from "../controllers/routeController";
import { createRouteValidation, updateRouteValidation } from "../validations/routeValidations";

const userRouter = express.Router();

userRouter.post("/create", createRouteValidation, createRoute);
userRouter.get("/", getAllRoutes);
userRouter.get("/:id", findRouteById);
userRouter.put("/update/:id",updateRouteValidation,updateRouteById);
userRouter.delete("/delete/:id",deleteRouteById);

export default userRouter;
