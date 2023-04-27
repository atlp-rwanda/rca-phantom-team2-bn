/* eslint-disable linebreak-style */
import express from "express"
import { Server } from "socket.io"
import { createServer } from "http" 
import cors from "cors"
import { configureEnv } from "./utils/dotenv"
import { LocationChange, StatusChange, CommuterChange } from "../types"

configureEnv()

export const server = createServer(express().use(cors()))
const io = new Server(server, {
    cors: {origin: "*"},
    transports: ["websocket"]
})
let lastAvailableSeats:number
let availbleSeats:number

io.on("connection", (socket)=> {
    console.log("NEW CONNECTION:", socket.id)
    
    socket.on("BUS_LOCATION_CHANGE", (data: LocationChange)=> {
        io.emit("BUS_LOCATION_CHANGE", data)
    })

    socket.on("BUS_STATUS_CHANGE",(data:StatusChange)=>{
        if (data.status==="START") lastAvailableSeats = data.voidseats
        io.emit("BUS_STATUS_CHANGE",data)
    })

    socket.on("COMMUTERS_CHANGE",(data:CommuterChange)=>{
        const numOfSeats = 28//this number will be got from backend busmodel        
        availbleSeats = lastAvailableSeats-data.aboarded+data.alighted

        const numOfCommuters:number = numOfSeats-availbleSeats
        io.emit("COMMUTERS_AND_AVAILABLE_SEATS",{busId:data.busId,availbleSeats:availbleSeats,numOfCommuters:numOfCommuters})
        lastAvailableSeats = availbleSeats
    })

    socket.on("disconnect", (reason)=> {
        console.log("SOCKECT DISCONNECTED: ", reason, ", ID: ", socket.id)
    })
}) 

const SOCKET_PORT = parseInt(process.env.SOCKET_PORT as string, 10) || 4003
const HOST = process.env.HOST || "localhost"

server.listen(SOCKET_PORT, HOST, ()=> console.log(`SOCKET SERVER: http://${HOST}:${SOCKET_PORT}`))