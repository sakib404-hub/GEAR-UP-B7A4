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
    const payLoad = req.body;
    const {accessToken, refreshToken} = await authServices.loginUser(payLoad);


    res.cookie("accessToken", accessToken, {
        httpOnly : true,
        secure : false,
        sameSite : "none",
        maxAge : 1000 * 60 * 60 * 24 
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure : false,
        sameSite :"none",
        maxAge : 1000 * 60 * 60 * 24 * 7
    })

    return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "User Successfully Logged In!",
        data : {
            accessToken,
            refreshToken
        }
    })
});

const getMe = catchAsync(async (req: Request, res: Response,next : NextFunction) => {
    
});

export const authController = {
    registerUser,
    loginUser,
    getMe,
};