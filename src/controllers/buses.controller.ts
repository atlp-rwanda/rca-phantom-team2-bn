import {Request, Response} from "express"
import Joi from "joi"
import Bus from "../models/Bus"
import RouteBus from "../models/RouteBus"
import Paginator from "../utils/pagination/paginator"
import { API_RESPONSE } from "../utils/response/response"

export const createBus = async (req: Request, res: Response)=> {
    const bus: Bus = await (await Bus.create(req.body)).save()

    return API_RESPONSE(res, {
        success: true,
        message: res.__("success"),
        status: 201,
        data: bus
    })
}

export const updateBusById = async (req: Request, res: Response)=> {
    const updateCount: [affectedCount: number] = await Bus.update(req.body, {
        where: {id: req.params.busId}
    })

    if(updateCount[0] < 1) return API_RESPONSE(res, {
        success: false,
        message: res.__("bus_not_found"),
        err: res.__("bus_not_found"),
        status: 404
    })
    
    else return API_RESPONSE(res, {
        success: true,
        message: res.__("success"),
        status: 200,
        data: {count: updateCount[0]}
    })
}

export const getBusById = async (req: Request, res: Response)=> {
    if(Joi.string().uuid({version: "uuidv4"}).validate(req.params.busId).error)
        return API_RESPONSE(res, {
            success: false,
            message: res.__("bus_not_found"),
            err: res.__("bus_not_found"),
            status: 404
        })
    const bus: Bus | null = await Bus.findByPk(req.params.busId)
    if(!bus) return API_RESPONSE(res, {
        success: false,
        message: res.__("bus_not_found"),
        err: res.__("bus_not_found"),
        status: 404
    })
    else return API_RESPONSE(res, {
        success: true,
        message: res.__("success"),
        status: 200,
        data: bus
    })
}

export const getAllBuses = async (req: Request, res: Response)=> {
    const page = parseInt((String(req.query.page ? req.query.page : 1))) || 1
    const perPage = parseInt((String(req.query.perPage ? req.query.perPage : 10))) || 10
    const paginator = new Paginator(Bus)

    const results = await paginator.paginate({}, page, perPage)
    
    return API_RESPONSE(res, {
        success: true,
        message: res.__("success"),
        status: 200,
        data: results
    })
}

export const deleteBusById = async (req: Request, res: Response)=> {
    if(Joi.string().uuid({version: "uuidv4"}).validate(req.params.busId).error)
        return API_RESPONSE(res, {
            success: false,
            message: res.__("bus_not_found"),
            err: res.__("bus_not_found"),
            status: 404
        })
        
    const deleteCount = await Bus.destroy({where: {
        id: req.params.busId
    }})

    if(deleteCount < 1) return API_RESPONSE(res, {
        success: false,
        message: res.__("bus_not_found"),
        err: res.__("bus_not_found"),
        status: 404
    })
    else return API_RESPONSE(res, {
        success: true,
        message: res.__("success"),
        status: 200,
        data: {count: deleteCount}
    })
}

export const linkBusToRoute = async (req: Request, res: Response) => {
    const busLink = await RouteBus.create(req.body)

    return API_RESPONSE(res, {
        success: true,
        status: 201,
        message: res.__("route_bus_linked"),
        data: busLink,
    })
}

export const getAllBusToRoutes = async (req: Request, res: Response)=> {
    const page = parseInt((String(req.query.page ? req.query.page : 1))) || 1
    const perPage = parseInt((String(req.query.perPage ? req.query.perPage : 10))) || 10
    const paginator = new Paginator(RouteBus)

    const results = await paginator.paginate({}, page, perPage)
    
    return API_RESPONSE(res, {
        success: true,
        message: res.__("success"),
        status: 200,
        data: results
    })
}