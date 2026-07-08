import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";

const getAllGear = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{

}) 

const getGearDetails = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{

}) 
const getGearCategories = catchAsync(async(req : Request, res : Response, next : NextFunction)=>{

}) 

export const gearController = {
    getAllGear,
    getGearDetails,
    getGearCategories
}