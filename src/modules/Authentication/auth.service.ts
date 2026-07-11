import { UserRole, UserStatus } from "../../../generated/prisma/enums";
import { config } from "../../config/config";
import { prisma } from "../../lib/prisma";
import { ILoginPayLoad, IRegisterPayLoad } from "./auth.interface";
import bcrypt from "bcrypt"
import  { SignOptions } from "jsonwebtoken" 
import { generateToken } from "../../utility/jwtUtility";
import validator from "validator"

const registerUser = async (payload: IRegisterPayLoad) => {

    const {email, role} = payload;

    const isExists = await prisma.user.findUnique({
        where : {
            email : email
        },
        omit : {
            password : true
        }
    })

    if(isExists){
        throw new Error("User with this Email already exists!");
    }

    if(!validator.isEmail(payload.email)){
        throw new Error("Invalid Email Address!");
    }

    let userRole  : UserRole = UserRole.CUSTOMER;

    if(role){
        switch(role.toLowerCase()){
            case "customer" : 
                userRole = UserRole.CUSTOMER;
                break;
            case "provider" :
                userRole = UserRole.PROVIDER;
                break;
            default : 
                throw new Error("Invalid role, only CUSTOMER and PROVIDER are allowed!");
        }
    }

    const hashedPassword = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_round));
    payload.password = hashedPassword;
    payload.role = userRole;

    const result = await prisma.user.create({
        data : {
            ...payload
        },
        omit : {
            password : true
        }
    })
    return result;
};

const loginUser = async (payload: ILoginPayLoad) => {

    const {email , password} = payload;

    const user = await prisma.user.findUnique({
        where : {
            email : email
        }
    })

    if(!user){
        throw new Error("User with this email does not exists!");
    }

    if(user.status === UserStatus.BLOCKED){
        throw new Error("Your Account Has been blocked, kindly contact support!");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if(!isPasswordMatched){
        throw new Error("Invalid Password!");
    }

    //? creating jwt payLoad
    const jwtPayLoad = {
        userId : user.id,
        name : user.name,
        email : user.email,
        role : user.role,
    }

    //? generating access and the refresh token and returning it

    const accessToken = generateToken(jwtPayLoad, config.jwt_access_secret, config.jwt_access_expires_in as SignOptions);

    const refreshToken = generateToken(jwtPayLoad, config.jwt_refresh_secret, config.jwt_refresh_expires_in as SignOptions);


    return {
        accessToken,
        refreshToken
    }
  
};

const getMe = async (userId: string) => {
    const result = await prisma.user.findUnique({
        where : {
            id : userId
        },
        include : {
            reviews : true,
        },
        omit : {
            password : true
        }
    })
   if(!result){
    throw new Error("User Does not exists!");
   }

   return result;
};

export const authServices = {
    registerUser,
    loginUser,
    getMe,
};