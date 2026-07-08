import { Response } from "express";
import { IResponse } from "../types/iresponse";




export const sendResponse = <T>(res : Response, data : IResponse<T>)=>{
    const response : IResponse<T> = {
        success : data.success,
        statusCode : data.statusCode,
        message : data.message,
    }

    if(data.data !== undefined){
        response.data = data.data
    }

    if(data.metaData !== undefined){
        response.metaData = data.metaData
    }

    return res.status(data.statusCode).json(response);
}