import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";

const createCategory = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{

})

const getAllCategory = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{

})

export const categoryController = {
    createCategory,
    getAllCategory
}