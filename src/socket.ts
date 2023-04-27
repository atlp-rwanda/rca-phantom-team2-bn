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
let lastAvailableSeats:number
let availbleSeats:number
interface LocationChange {
    busId: string;
    busType: string;
    latitude: number;
    longitude: number;
}
interface CommuterChange{
    busId: string;
    busType: string;
    alighted: number;
    aboarded: number;
}
interface StatusChange{
    busId: string;
    busType: string;
    status: string;
    voidseats: number;
}
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
