import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../generated/prisma/enums";
import { catchAsync } from "../utility/catchAsync";

export const auth = (...requiredRoles: UserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.cookies.accessToken ? req.cookies.accessToken
            :
            req.headers.authorization?.startsWith('Bearer ') ?
                req.headers.authorization.split(" ")[1]
                : req.headers.authorization;
        if(!token){
            throw new Error("You are not logged in, please login to access this resources");
        }

        

    })
}