import express from "express"
import { deleteRoleById, getAllRoles, getRoleById, grantRolePermission, registerRole, updateRoleById } from "../controllers/roles.controller"
import { newRoleValidation, rolePermissionValidation, updateRoleValidation } from "../validations/roles"

const router = express.Router()

router.post("/grant-permission", rolePermissionValidation, grantRolePermission)

router.post("", newRoleValidation, registerRole)

router.get("/role/:roleId", getRoleById)

router.get("", getAllRoles)

router.put("/:roleId", updateRoleValidation, updateRoleById)

router.delete(":/roleId", deleteRoleById)

export default router