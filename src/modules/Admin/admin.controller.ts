import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { adminServices } from "./admin.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";
import { UserStatus } from "../../../generated/prisma/enums";

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminServices.getAllUsers();

    return sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Users Information Retrive Successfully!",
        data: result
    })
});

const updateUserStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.id;
    const userStatus = req.body.status?.toLowerCase();

    let payLoad: UserStatus;

    if (userStatus === "activate" || userStatus === "active") {
        payLoad = UserStatus.ACTIVE;
    } else if (userStatus === "suspend" || userStatus === "blocked") {
        payLoad = UserStatus.BLOCKED;
    } else {
        throw new Error("Invalid status. Use 'activate', 'active', 'suspend', or 'blocked'.");
        return;
    }

    const result = await adminServices.updateUserStatus(payLoad, userId as string);

    return sendResponse(res, {
       success : true,
       statusCode : status.OK,
       message : "User status Updated successfully",
       data : result
    })

});

const getAllGear = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminServices.getAllGear();

    return sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "All Gears Retived Successfully",
        data: result
    })
});

const getAllRentals = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const result = await adminServices.getAllRentals();

   return sendResponse(res, {
    success : true,
    statusCode : status.OK,
    message : "All rental Orders successfully Retrived!",
    data : result
   })
});

export const adminController = {
    getAllUsers,
    updateUserStatus,
    getAllGear,
    getAllRentals,
};