import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { providerServices } from "./provider.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";

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