import * as express from "express"

interface UserAuth {
    userId: string,
    roleId: string
}


declare global {
    namespace Express {
        interface Request {
            auth?: UserAuth
        }
    }
}

export {}