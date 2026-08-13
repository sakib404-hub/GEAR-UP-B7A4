import { GearItemStatus, OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IPayLoad } from "./orders.interface";

const createOrder = async (payLoad: IPayLoad, userId: string) => {
  const { gearId, rentalDays } = payLoad;

  // Validate rental days
  if (rentalDays <= 0) {
    throw new Error("Rental days must be at least 1.");
  }

  if (rentalDays >= 14) {
    throw new Error(
      `You cannot rent gear for ${rentalDays} days. Maximum rental duration is 13 days.`
    );
  }

  // Find gear
  const gear = await prisma.gearItems.findUnique({
    where: {
      id: gearId,
    },
  });

  if (!gear) {
    throw new Error("Gear not found!");
  }

  if (gear.stockQuantity <= 0) {
    throw new Error("Out of stock");
  }

  if (gear.status === GearItemStatus.UNAVAILABLE) {
    throw new Error("This gear is currently unavailable.");
  }

  if (gear.providerId === userId) {
    throw new Error("You cannot rent your own gear.");
  }

  const totalAmount = rentalDays * gear.pricePerDay;

  const result = await prisma.$transaction(async (tx) => {
    // Create order
    const order = await tx.rentalOrders.create({
      data: {
        ...payLoad,
        userId,
        totalAmount,
      },
    });

    // Decrease stock
    await tx.gearItems.update({
      where: {
        id: gearId,
      },
      data: {
        stockQuantity: {
          decrement: 1,
        },
      },
    });

    return order;
  });

  return result;
};

const getUsersRentalOrders = async (userId: string) => {
  const result = await prisma.rentalOrders.findMany({
    where: {
      userId,
      status : {
        not : OrderStatus.RETURNED
      }
    },
    include: {
      gear: {
        select: {
          provider: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return result;
};

const getUsersCompletedOrders = async(userId : string)=>{
  const result = await prisma.rentalOrders.findMany({
    where: {
      userId,
      status : OrderStatus.RETURNED
    },
    include: {
      gear: {
        select: {
          provider: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  return result;
}

const getOrderDetails = async (orderId: string, userId: string) => {
  const result = await prisma.rentalOrders.findUnique({
    where: {
      id: orderId,
    },
    include: {
      gear: {
        select: {
          provider: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!result) {
    throw new Error("Order not found!");
  }

  if (result.userId !== userId) {
    throw new Error("Forbidden Access!");
  }

  return result;
};

export const orderServices = {
  createOrder,
  getUsersRentalOrders,
  getOrderDetails,
  getUsersCompletedOrders
};
