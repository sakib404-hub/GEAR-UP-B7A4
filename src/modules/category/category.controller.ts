import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { categoryServices } from "./category.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";

const createCategory = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const payLoad = req.body;
    const userId = req.user?.id;

    const result = await categoryServices.createCategory(payLoad, userId as string);

    return sendResponse(res, {
        success : true,
        statusCode : status.CREATED,
        message : "Category created Successfully!",
        data : result
    })
})

const getAllCategory = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const result = await categoryServices.getAllCategory();

    return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "All category fetched successfully",
        data : result
    })

})

export const categoryController = {
    createCategory,
    getAllCategory
}