import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";

const registerUser = catchAsync(async (req: Request, res: Response, next : NextFunction) => {
   
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