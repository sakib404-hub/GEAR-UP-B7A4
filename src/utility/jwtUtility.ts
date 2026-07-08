import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken"

export const generateToken = (payLoad : JwtPayload, accessSecret : string, expiresIn : SignOptions)=>{

    const token = jwt.sign(payLoad, accessSecret, {expiresIn} as SignOptions)

    return token;
}

export const verifiedToken = (token : string, secret : string)=>{
    try{

        const verifiedToken = jwt.verify(token, secret);

        return {
            success : true,
            data : verifiedToken
        }

    }catch(error){
        return {
            success : false,
            errMessage : error instanceof Error ? error.message : "Internal Server Error!"
        }
    }
}