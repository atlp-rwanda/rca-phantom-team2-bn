import { config } from "dotenv"

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

import app from "./app"
import {server} from "./socket"

const PORT = parseInt(<string>process.env.PORT, 10) || 4000
const SOCKET_PORT = parseInt(process.env.PORT as string, 10) || 4003
const HOST = process.env.HOST || "localhost"

server.listen(SOCKET_PORT, HOST, ()=> console.log(`SERVER: http://${HOST}:${PORT}`))

app.listen(PORT, async () => {
    console.info(`Server started at: http://localhost:${PORT}`)
})
