import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { providerServices } from "./provider.service";

const createGear = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

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