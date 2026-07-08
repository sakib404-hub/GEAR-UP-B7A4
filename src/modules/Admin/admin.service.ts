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

const getAllGear = () => {};

const getAllRentals = () => {};

export const adminServices = {
  getAllUsers,
  updateUserStatus,
  getAllGear,
  getAllRentals,
};