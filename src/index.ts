import { configureEnv } from "./utils/dotenv"

// Configure dotenv
configureEnv()

import app from "./app"
const PORT = parseInt(<string>process.env.PORT, 10) || 4000

app.listen(PORT, async () => {
    console.info(`API SERVER: http://localhost:${PORT}`)
})
