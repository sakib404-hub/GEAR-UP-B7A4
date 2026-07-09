import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { paymentServices } from "./payment.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";

const createPayment = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const orderId = req.params.orderId;

    const result = await paymentServices.createPayment(orderId as string);

    return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "Payment created successfully!",
        data : result
    })
})

export const paymentController = {
    createPayment
}