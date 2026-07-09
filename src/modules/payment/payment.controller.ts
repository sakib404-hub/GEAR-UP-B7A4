import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { paymentServices } from "./payment.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";

const createPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;
    const userId = req.user?.id;

    const result = await paymentServices.createPayment(orderId as string, userId as string);

    return sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Payment created successfully!",
        data: {
            paymentUrl: result
        }
    })
})

const handlePaymentConfirmWebHook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const event = req.body as Buffer;
    const signature = req.headers['stripe-signature'];


    const result = await paymentServices.handlePaymentConfirmWebHook(event, signature as string);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: "Web Hook triggered successfully!",
        data: result
    })
})

export const paymentController = {
    createPayment,
    handlePaymentConfirmWebHook
}