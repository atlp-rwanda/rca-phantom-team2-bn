/* eslint-disable linebreak-style */
import cors from "cors"
import Bus from "./models/Bus" 
import { Server } from "socket.io"
import { createServer } from "http" 
import { configureEnv } from "./utils/dotenv"
import express, { Request, Response } from "express"
import { LocationChange, StatusChange, CommuterChange } from "../types"
import { BusStatus } from "./enums/bus.enums"
import { connectDB } from "./db/config"


configureEnv()
connectDB()

const PORT = parseInt(process.env.PORT as string, 10) || 4003
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {origin: "*"},
    transports: ["websocket"]
})

app.use(cors({origin: "*"}))

app.get("/health", (req: Request, res: Response)=> {
    return res.status(200).send({
        status: 200,
        message: "RUNNING",
        data: httpServer.address()
    })
})

io.on("connection", (socket)=> {
    console.log("NEW CONNECTION:", socket.id)
    
    socket.on("BUS_LOCATION_CHANGE", (data: LocationChange)=> {
        io.emit("BUS_LOCATION_CHANGE", data)
    })

    socket.on("BUS_STATUS_CHANGE", async (data: StatusChange)=>{
        await Bus.update({
            status: data.status,
            ...(data.status === BusStatus.STARTING? {availbleSeats: data.voidseats}:{})
        },{
            where: {id: data.busId}
        })
        io.emit("BUS_STATUS_CHANGE",data)
    })

    socket.on("COMMUTERS_CHANGE", async (data: CommuterChange)=>{
        const bus = await Bus.findByPk(data.busId)
        if(!bus) return

        const availbleSeats = (bus.availbleSeats - data.aboarded) + data.alighted
        const numOfCommuters:number = bus.numOfSeats-availbleSeats

        await Bus.update({availbleSeats: availbleSeats}, {where: { id: data.busId }})
        io.emit("COMMUTERS_AND_AVAILABLE_SEATS",{busId: data.busId, availbleSeats: availbleSeats, numOfCommuters: numOfCommuters})
    })

    socket.on("disconnect", (reason)=> {
        console.log("SOCKECT DISCONNECTED: ", reason, ", ID: ", socket.id)
    })
}) 

httpServer.listen(PORT, ()=> console.log(`SERVER STARTED: http://localhost:${PORT}`))
