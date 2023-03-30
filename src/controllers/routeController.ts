import { Request, Response } from "express";
import RouteModel from "../models/RouteModel";
import { API_RESPONSE } from "../utils/response/response";

export const createRoute = async (req: Request, res: Response) => {
  const { routeName, latitude, longitude } = req.body;

  try {
    const routeExists: RouteModel | null = await findRouteByName(routeName);

    if (routeExists) {
      return API_RESPONSE(res, {
        success: false,
        message: res.__("route_exits_message"),
        status: 400,
      });
    }

    const newRoute = await RouteModel.create({
      routeName,
      latitude,
      longitude,
    });

    return API_RESPONSE(res, {
      success: true,
      message: res.__("route_created_message"),
      data: newRoute.toJSON(),
      status: 201,
    });
  } catch (error) {
    return API_RESPONSE(res, {
      success: false,
      message: res.__("failed_to_create_route_message"),
      status: 400,
    });
  }
};

const findRouteByName = async (name: string) => {
  try {
    const route: RouteModel | null = await RouteModel.findOne({
      where: {
        routeName: name,
      },
    });
    return route;
  } catch (error) {
    return null;
  }
};

export const findRouteById = async (req: Request, res: Response) => {
  try {
    const route: RouteModel | null = await RouteModel.findByPk(req.params.id);
    if (!route) {
      return API_RESPONSE(res, {
        success: false,
        message: res.__("route_not_found_message"),
        data: {},
        status: 404,
      });
    }
    return API_RESPONSE(res, {
      success: true,
      message: res.__("route_found_message"),
      data: route,
      status: 201,
    });
  } catch (error) {
    return API_RESPONSE(res, {
      success: false,
      message: res.__("failed_to_fetch_route_message"),
      status: 400,
    });
  }
};
