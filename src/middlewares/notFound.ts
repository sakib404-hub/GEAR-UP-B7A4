import { Request, Response } from "express";
import status from "http-status";

export const notFound = (req : Request, res : Response)=>{
    res.status(status.NOT_FOUND).json({
        success : false,
        statusCode : status.NOT_FOUND,
        error : "Not Found.",
        message : `The requested route ${req.originalUrl} does not exist!`,
        method : req.method,
        path : req.originalUrl,
        timeStamp : new Date().toISOString(),
    })
}