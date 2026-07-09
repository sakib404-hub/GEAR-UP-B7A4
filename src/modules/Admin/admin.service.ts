import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsers = async() => {
    const result = await prisma.user.findMany({
        omit : {
            password : true,
            createdAt : true,
            updatedAt : true
        }
    });
    return result;
};

const updateUserStatus = async(payLoad : UserStatus, userId : string) => {
    const user = await prisma.user.findUnique({
        where : {
            id : userId
        },
        select : {
            status : true
        }
    })

    if(!user){
        throw new Error("User Not Found!");
    }

    if(user.status === payLoad){
         throw new Error(`User is already ${payLoad.toLowerCase()}.`);
    }

    const updatedUser = await prisma.user.update({
        where : {
            id : userId
        },
        data : {
            status : payLoad
        },
        omit : {
            password : true,
            createdAt : true,
        }
    })

    return updatedUser;
};

const getAllGear = async() => {
    const result = await prisma.gearItems.findMany();
    return result;
};

const getAllRentals = async() => {
    const allRentalOrders = await prisma.rentalOrders.findMany();
    return allRentalOrders;
};

export const adminServices = {
  getAllUsers,
  updateUserStatus,
  getAllGear,
  getAllRentals,
};