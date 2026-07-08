import { config } from "../../config/config";
import { prisma } from "../../lib/prisma";
import { IRegisterPayLoad } from "./auth.interface";
import bcrypt from "bcrypt"

const registerUser = async (payload: IRegisterPayLoad) => {

    const {email} = payload;

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

    const hashedPassword = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_round));
    payload.password = hashedPassword;

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

const loginUser = async (payload: any) => {
  
};

const getMe = async (user: any) => {
   
};

export const authServices = {
    registerUser,
    loginUser,
    getMe,
};