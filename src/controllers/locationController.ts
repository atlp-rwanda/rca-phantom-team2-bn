import { Request, Response } from "express"
import LocationModel from "../models/Location"
import Paginator from "../utils/pagination/paginator"
import { API_RESPONSE } from "../utils/response/response"

export const createLocation = async (req: Request, res: Response) => {
    const { name, latitude, longitude } = req.body

    try {
        const locationExists: LocationModel | null = await findLocationByName(name)

        if (locationExists) {
            return API_RESPONSE(res, {
                success: false,
                message: res.__("location_exits_message"),
                status: 400,
            })
        }

        const newLocation = await LocationModel.create({
            name,
            latitude,
            longitude,
        })

        return API_RESPONSE(res, {
            success: true,
            message: res.__("location_created_message"),
            data: newLocation.toJSON(),
            status: 201,
        })
    } catch (error) {
        console.log(error)

        return API_RESPONSE(res, {
            success: false,
            message: res.__("failed_to_create_location_message"),
            status: 500,
        })
    }
}

const findLocationByName = async (name: string) => {
    try {
        const location: LocationModel | null = await LocationModel.findOne({
            where: {
                name: name,
            },
        })
        return location
    } catch (error) {
        return null
    }
}
export const getAllLocations = async (req: Request, res: Response) => {
    try {
        const page = parseInt((String(req.query.page ? req.query.page : 1))) || 1
        const perPage = parseInt((String(req.query.perPage ? req.query.perPage : 10))) || 10
        const paginator = new Paginator(LocationModel)
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
            message: res.__("failed_to_fetch_location_message"),
            status: 500,
        })
    }
}
export const findLocationById = async (req: Request, res: Response) => {
    try {
        const location: LocationModel | null = await LocationModel.findByPk(
            req.params.id
        )
        if (!location) {
            return API_RESPONSE(res, {
                success: false,
                message: res.__("location_not_found_message"),
                data: {},
                status: 404,
            })
        }
        return API_RESPONSE(res, {
            success: true,
            message: res.__("location_found_message"),
            data: location,
            status: 200,
        })
    } catch (error) {
        return API_RESPONSE(res, {
            success: false,
            message: res.__("failed_to_fetch_location_message"),
            status: 500,
        })
    }
}
export const updateLocationById = async (req: Request, res: Response) => {
    try {
        const { name, latitude, longitude } = req.body
        let location: LocationModel | null = await LocationModel.findByPk(
            req.params.id
        )
        if (!location) {
            return API_RESPONSE(res, {
                success: false,
                message: res.__("location_not_found_message"),
                data: {},
                status: 404,
            })
        } else {
            location = await location.update({ name, latitude, longitude })
            return API_RESPONSE(res, {
                success: true,
                message: res.__("location_updated_message"),
                data: location.toJSON(),
                status: 200,
            })
        }
    } catch (error) {
        return API_RESPONSE(res, {
            success: false,
            message: res.__("failed_to_fetch_location_message"),
            status: 500,
        })
    }
}
export const deleteLocationById = async (req: Request, res: Response) => {
    try {
        const location: LocationModel | null = await LocationModel.findByPk(
            req.params.id
        )
        if (!location) {
            return API_RESPONSE(res, {
                success: false,
                message: res.__("location_not_found_message"),
                data: {},
                status: 404,
            })
        } else {
            await location.destroy()
            return API_RESPONSE(res, {
                success: true,
                message: res.__("location_deleted_message"),
                // data: deleteRes,
                status: 200,
            })
        }
    } catch (error) {
        return API_RESPONSE(res, {
            success: false,
            message: res.__("failed_to_fetch_location_message"),
            status: 500,
        })
    }
}
