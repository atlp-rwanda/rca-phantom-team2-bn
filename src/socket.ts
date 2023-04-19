/* eslint-disable linebreak-style */
import express from "express"
import {Server} from "socket.io"
import {createServer} from "http" 
import cors from "cors"

export const server = createServer(express().use(cors()))
const io = new Server(server)


