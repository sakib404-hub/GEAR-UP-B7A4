import { prisma } from "../../lib/prisma";
import { ICreateGear } from "./provider.interface";

const createGear = async (payLoad : ICreateGear, providerId : string) => {
  const result = await prisma.gearItems.create({
    data : {
      ...payLoad,
      providerId
    }
  })
  return result;
};

const updateGear = async () => {

};

const deleteGear = async () => {

};

const getIncomingOrders = async () => {

};

const updateOrderStatus = async () => {

};

export const providerServices = {
  createGear,
  updateGear,
  deleteGear,
  getIncomingOrders,
  updateOrderStatus,
};