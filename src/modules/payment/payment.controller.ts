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

const handlePaymentConfirmWebHook = catchAsync(
  async (req: Request, res: Response) => {
    const signature = req.headers["stripe-signature"];

    if (!signature || Array.isArray(signature)) {
      res.status(400).json({
        success: false,
        message: "Missing Stripe signature",
      });
      return;
    }

    const result =
      await paymentServices.handlePaymentConfirmWebHook(
        req.body as Buffer,
        signature
      );

    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Webhook triggered successfully!",
      data: result,
    });
  }
);

const getUsersPaymentsHistory = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const userId = req.user?.id;

    const result = await paymentServices.getUsersPaymentsHistory(userId as string);

    return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "Your Payment History",
        data : result 
    })
})

const getPaymentDetails = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const paymentId = req.params.id;
    const userId = req.user?.id;

    const result = await paymentServices.getPaymentDetails(paymentId as string, userId as string);
    
      return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "Payment Details Retrive successfully",
        data : result 
    })
})

export const paymentController = {
    createPayment,
    handlePaymentConfirmWebHook,
    getUsersPaymentsHistory,
    getPaymentDetails
}