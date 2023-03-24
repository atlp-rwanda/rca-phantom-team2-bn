import express from "express"
import { getAllModels, getSupportedOperations, registerNewPermission } from "../controllers/permissions.controller"
import { newPermissionValidation } from "../validations/permissions"

const router = express.Router()

router.post("", newPermissionValidation, registerNewPermission)

router.get("/operations", getSupportedOperations)

router.get("/models", getAllModels)

export default router