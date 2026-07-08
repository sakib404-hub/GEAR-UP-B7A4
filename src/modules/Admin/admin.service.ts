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

const updateUserStatus = () => {};

const getAllGear = async() => {
    const result = await prisma.gearItems.findMany();
    return result;
};

const getAllRentals = () => {};

export const adminServices = {
  getAllUsers,
  updateUserStatus,
  getAllGear,
  getAllRentals,
};