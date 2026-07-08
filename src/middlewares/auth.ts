import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../generated/prisma/enums";
import { catchAsync } from "../utility/catchAsync";
import { verifyToken } from "../utility/jwtUtility";
import { config } from "../config/config";
import { JwtPayload } from "jsonwebtoken";


declare global {
    namespace Express {
        interface Request {
            user ? : {
                id : string;
                name : string;
                email : string;
                role : UserRole
            }
        }
    }
}

export const auth = (...requiredRoles: UserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.cookies.accessToken ? req.cookies.accessToken
            :
            req.headers.authorization?.startsWith('Bearer ') ?
                req.headers.authorization.split(" ")[1]
                : req.headers.authorization;
        if(!token){
            throw new Error("Authentication required. Please log in to continue.");
        }

        const verifiedToken = verifyToken(token, config.jwt_access_secret)

        if(!verifiedToken.success){
            throw new Error(verifiedToken.errMessage);
        }

        const {userId, name, email, role} = verifiedToken.data as JwtPayload;

        if(requiredRoles.length && !requiredRoles.includes(role)){
            throw new Error("Access denied. You do not have permission to perform this action.");
        }

        req.user = {
            id : userId,
            name,
            email, 
            role
        }

        next();
    })
}