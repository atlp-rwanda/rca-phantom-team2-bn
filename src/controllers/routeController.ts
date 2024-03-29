import { Request, Response } from "express"
import RouteModel from "../models/Route"
import Paginator from "../utils/pagination/paginator"
import { API_RESPONSE } from "../utils/response/response"

export const createRoute = async (req: Request, res: Response) => {
    const { name, origin, destination } = req.body

    try {
        const routeExists: RouteModel | null = await findRouteByName(name)

        if (routeExists) {
            return API_RESPONSE(res, {
                success: false,
                message: res.__("route_exits_message"),
                status: 400,
            })
        }

        const newRoute = await RouteModel.create({
            name,
            origin,
            destination,
        })

        return API_RESPONSE(res, {
            success: true,
            message: res.__("route_created_message"),
            data: newRoute.toJSON(),
            status: 201,
        })
    } catch (error) {
        return API_RESPONSE(res, {
            success: false,
            message: res.__("failed_to_create_route_message"),
            status: 500,
        })
    }
}



const findRouteByName = async (name: string) => {
    try {
        const route: RouteModel | null = await RouteModel.findOne({
            where: {
                name: name,
            },
        })
        return route
    } catch (error) {
        return null
    }
}
export const getAllRoutes = async (req: Request, res: Response) => {
    try {
        const page = parseInt((String(req.query.page ? req.query.page : 1))) || 1
        const perPage = parseInt((String(req.query.perPage ? req.query.perPage : 10))) || 10
        const paginator = new Paginator(RouteModel)
        const results = await paginator.paginate({}, page, perPage)
        
        return API_RESPONSE(res, {
            success: true,
            message: res.__("success"),
            data: results,
            status: 200,
        })
    } catch (error) {
        return API_RESPONSE(res, {
            success: false,
            message: res.__("failed_to_fetch_route_message"),
            status: 500,
        })
    }
}
export const getAllRoutesBasedOnSelectionCriteria = async (req: Request, res: Response) => {
    try {
        const page = parseInt((String(req.query.page ? req.query.page : 1))) || 1
        const perPage = parseInt((String(req.query.perPage ? req.query.perPage : 10))) || 10
        const paginator = new Paginator(RouteModel)
  
        // Get origin and destination from query parameters
        const origin = req.query.origin as string
        const destination = req.query.destination as string
  
        // Define selection criteria based on origin and destination query parameters
        const where: { [key: string]: any } = {}
        if (origin) {
            where.origin = origin
        }
        if (destination) {
            where.destination = destination
        }
  
        // Paginate routes based on selection criteria
        const results = await paginator.paginate({
            where,
            order: [["createdAt", "DESC"]]
        }, page, perPage)
  
        return API_RESPONSE(res, {
            success: true,
            message: res.__("success"),
            data: results,
            status: 200,
        })
    } catch (error) {
        return API_RESPONSE(res, {
            success: false,
            message: res.__("failed_to_fetch_route_message"),
            status: 500,
        })
    }
}
  
export const findRouteById = async (req: Request, res: Response) => {
    try {
        const route: RouteModel | null = await RouteModel.findByPk(req.params.id)
        if (!route) {
            return API_RESPONSE(res, {
                success: false,
                message: res.__("route_not_found_message"),
                data: {},
                status: 404,
            })
        }
        return API_RESPONSE(res, {
            success: true,
            message: res.__("route_found_message"),
            data: route,
            status: 200,
        })
    } catch (error) {
        return API_RESPONSE(res, {
            success: false,
            message: res.__("failed_to_fetch_route_message"),
            status: 500,
        })
    }
}
export const updateRouteById = async (req: Request, res: Response) => {
    try {
        const { name, origin, destination } = req.body
        let route: RouteModel | null = await RouteModel.findByPk(req.params.id)
        if (!route) {
            return API_RESPONSE(res, {
                success: false,
                message: res.__("route_not_found_message"),
                data: {},
                status: 404,
            })
        } else {
            route = await route.update({ name, origin, destination })
            return API_RESPONSE(res, {
                success: true,
                message: res.__("route_updated_message"),
                data: route.toJSON(),
                status: 200,
            })
        }
    } catch (error) {
        return API_RESPONSE(res, {
            success: false,
            message: res.__("failed_to_fetch_route_message"),
            status: 500,
        })
    }
}
export const deleteRouteById = async (req: Request, res: Response) => {
    try {
        const route: RouteModel | null = await RouteModel.findByPk(req.params.id)
        if (!route) {
            return API_RESPONSE(res, {
                success: false,
                message: res.__("route_not_found_message"),
                data: {},
                status: 404,
            })
        } else {
            await route.destroy()
            return API_RESPONSE(res, {
                success: true,
                message: res.__("route_deleted_message"),
                // data: deleteRes,
                status: 200,
            })
        }
    } catch (error) {
        return API_RESPONSE(res, {
            success: false,
            message: res.__("failed_to_fetch_route_message"),
            status: 500,
        })
    }
}
