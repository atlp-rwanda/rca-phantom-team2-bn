import express, { Request, Response } from 'express'
const app = express()

const PORT = process.env.PORT || 4000

app.get("", (req: Request, res: Response) => {
    return res.status(200).send({
        message: "Welcome to Phantom server",
        serverStatus: "RUNNING"
    })
})

app.listen(PORT, () => {
    console.info(`Server started at: https://localhost:${PORT}`)
})