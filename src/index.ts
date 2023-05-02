import { configureEnv } from "./utils/dotenv"

// Configure dotenv
configureEnv()

import app from "./app"
import {server} from "./socket"

const PORT = parseInt(<string>process.env.PORT, 10) || 4000
const SOCKET_PORT = parseInt(process.env.SOCKET_PORT as string, 10) || 4003
const HOST = process.env.HOST || "localhost"

server.listen(SOCKET_PORT, HOST, ()=> console.log(`SOCKET SERVER: http://${HOST}:${SOCKET_PORT}`))

app.listen(PORT, async () => {
    console.info(`API SERVER: http://localhost:${PORT}`)
})
