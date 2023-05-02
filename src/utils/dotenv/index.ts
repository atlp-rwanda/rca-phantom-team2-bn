import { config } from "dotenv"

export const configureEnv = ()=> {
    switch (process.env.NODE_ENV) {
        case "development":
            config({ path: ".env.development" })
            break
        case "production":
            config({ path: ".env.production" })
            break
        default:
            config({ path: ".env" })
            break
    }
}