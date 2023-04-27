/* eslint-disable linebreak-style */
import express from "express"
import { Server } from "socket.io"
import { createServer } from "http" 
import cors from "cors"

export const server = createServer(express().use(cors()))
const io = new Server(server, {
    cors: {origin: "*"},
    transports: ["websocket"]
})

interface LocationChange {
    busId: string;
    latitude: number;
    longitude: number;
}

io.on("connection", (socket)=> {
    console.log("NEW CONNECTION:", socket.id)
    
    socket.on("BUS_LOCATION_CHANGE", (data: LocationChange)=> {
        io.emit("BUS_LOCATION_CHANGE", data)
    })

    socket.on("disconnect", (reason)=> {
        console.log("SOCKECT DISCONNECTED: ", reason, ", ID: ", socket.id)
    })
}) 
