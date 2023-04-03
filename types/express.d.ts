import "express"

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