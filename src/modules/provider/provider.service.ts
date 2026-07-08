import { prisma } from "../../lib/prisma";
import { ICreateGear, IUpdateGear } from "./provider.interface";

const createGear = async (payLoad: ICreateGear, providerId: string) => {
  const result = await prisma.gearItems.create({
    data: {
      ...payLoad,
      providerId
    }
  })
  return result;
};

const updateGear = async (payLoad: IUpdateGear, gearId: string, userId: string, isAdmin: boolean) => {
  const gear = await prisma.gearItems.findUnique({
    where: {
      id: gearId
    },
    select: {
      providerId: true
    }
  });

  if (!gear) {
    throw new Error("Gear Not Found!");
  }

  if (gear.providerId !== userId && !isAdmin) {
    throw new Error("You do not have permission to update this gear.");
  }

  const updatedGear = await prisma.gearItems.update({
    where: {
      id: gearId
    },
    data: {
      ...payLoad
    }
  })

  return updatedGear;
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