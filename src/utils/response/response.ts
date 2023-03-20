
import { Response } from 'express'

interface responseData {
    success: boolean,
    message: string,
    data?: unknown,
    err?: unknown,
    status: number
}
export const API_RESPONSE = (res: Response ,data: responseData) => {
    return res.status(data.status).json(data)
}