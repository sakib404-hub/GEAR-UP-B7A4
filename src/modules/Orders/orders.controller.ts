import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";
import { orderServices } from "./oders.service";

const createOrder = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const payLoad = req.body;
    const userId = req.user?.id;

    const result = await orderServices.createOrder(payLoad, userId as string)

    return sendResponse(res, {
        success : true,
        statusCode : status.CREATED,
        message : "Your order has been posted, please wait for confirmation",
        data : result 
    })
})

const getUsersRentalOrders = catchAsync(async(req : Request, res: Response, next : NextFunction )=>{
    const userId = req.user?.id;

    const result = await orderServices.getUsersRentalOrders(userId as string);

    return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "Your Orders fetched successfully",
        data : result
    })

})

const getOrderDetails = catchAsync(async(req : Request, res: Response, next : NextFunction )=>{
    const orderId = req.params.id;
    const userId = req.user?.id;

    const result = await orderServices.getOrderDetails(orderId as string, userId as string);

    return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "Order Details fetched successfully",
        data : result
    })

})

export const orderController = {
    createOrder,
    getUsersRentalOrders,
    getOrderDetails
}