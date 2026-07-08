import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { adminServices } from "./admin.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminServices.getAllUsers();

    return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "Users Information Retrive Successfully!",
        data : result
    })
});

const updateUserStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await adminServices.updateUserStatus();
});

const getAllGear = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await adminServices.getAllGear();
});

const getAllRentals = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await adminServices.getAllRentals();
});

export const adminController = {
    getAllUsers,
    updateUserStatus,
    getAllGear,
    getAllRentals,
};