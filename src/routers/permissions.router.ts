import express from "express"
import { getAllModels, getAllPermissions, getSupportedOperations, registerNewPermission } from "../controllers/permissions.controller"
import { newPermissionValidation } from "../validations/permissions"

const router = express.Router()

router.post("", newPermissionValidation, registerNewPermission)

router.get("/operations", getSupportedOperations)

router.get("/models", getAllModels)

router.get("", getAllPermissions)

export default router