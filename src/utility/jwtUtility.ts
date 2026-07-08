import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken"

export const generateToken = (payLoad : JwtPayload, accessSecret : string, expiresIn : SignOptions)=>{

    const token = jwt.sign(payLoad, accessSecret, {expiresIn} as SignOptions)

    return token;
}