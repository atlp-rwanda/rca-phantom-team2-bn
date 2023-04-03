import {Request, Response} from "express"
import Bus from "../models/Bus"
import { API_RESPONSE } from "../utils/response/response"

export const createBus = async (req: Request, res: Response)=> {
    const bus = await Bus.create(req.body)

    return API_RESPONSE(res, {
        success: true,
        message: res.__("success"),
        status: 201,
        data: bus
    })
}