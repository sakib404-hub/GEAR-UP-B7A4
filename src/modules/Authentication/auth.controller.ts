import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";

const registerUser = catchAsync(async (req: Request, res: Response, next : NextFunction) => {
   const payLoad = req.body;
   const result = await authServices.registerUser(payLoad);

   return sendResponse(res, {
    success : true,
    statusCode : status.CREATED,
    message : "User Registration Successfull",
    data : result
   })
});

const loginUser = catchAsync(async (req: Request, res: Response,next : NextFunction) => {
  
});

const getMe = catchAsync(async (req: Request, res: Response,next : NextFunction) => {
    
});

export const authController = {
    registerUser,
    loginUser,
    getMe,
};