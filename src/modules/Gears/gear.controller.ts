import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { gearServices } from "./gear.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";

const getAllGear = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const result = await gearServices.getAllGear();

    return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "All Gears Retrive Successfully!",
        data : result
    })
}) 

const getGearDetails = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{
    const gearId = req.params.id;

    const result = await gearServices.getGearDetails(gearId as string);

     return sendResponse(res, {
        success : true,
        statusCode : status.OK,
        message : "Gears Details Retrive Successfully!",
        data : result
    })
}) 


export const gearController = {
    getAllGear,
    getGearDetails,
}