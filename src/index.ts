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
const PORT = parseInt(<string>process.env.PORT, 10) || 4000

app.listen(PORT, async () => {
    console.info(`Server started at: http://localhost:${PORT}`)
})
