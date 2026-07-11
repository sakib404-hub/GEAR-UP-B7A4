import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { reviewServices } from "./review.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";

const creatReview = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{

    const payLoad = req.body;

    const orderId = req.params.id;

    const result = await reviewServices.creatReview(payLoad, orderId as string , req.user?.id as string);

    return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "Review Created successfully!",
        data : result 
    })

})


export const reviewController = {
    creatReview
}