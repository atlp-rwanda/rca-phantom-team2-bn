import { Request } from "express"

interface UserAuth {
    userId: string,
    roleId: string
}


export interface IRequest extends Request {
    auth?: UserAuth
}
