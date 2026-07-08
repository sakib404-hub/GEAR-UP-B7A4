import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { providerServices } from "./provider.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";
import { UserRole } from "../../../generated/prisma/enums";

const createGear = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payLoad = req.body;
    const providerId = req.user?.id;

    const result = await providerServices.createGear(payLoad, providerId as string)

    return sendResponse(res,{
        success : true,
        statusCode : status.CREATED,
        message : "Gear Item Created Successfully!",
        data : result
    })
});

const updateGear = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const gearId = req.params.id;
    const payLoad = req.body;
    const userId = req.user?.id;
    const isAdmin = req.user?.role === UserRole.ADMIN ? true : false;

    const result = await providerServices.updateGear(payLoad, gearId as string, userId as string, isAdmin)

    return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "Gear Updated Successfully!",
        data : result
    })
});

const deleteGear = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getIncomingOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const updateOrderStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

export const providerController = {
    createGear,
    updateGear,
    deleteGear,
    getIncomingOrders,
    updateOrderStatus,
};