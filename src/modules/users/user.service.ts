import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getUserSummary = async (userId: string) => {
  const [
    totalOrders,
    pendingOrders,
    confirmedOrders,
    pickedUpOrders,
    returnedOrders,
    cancelledOrders,
    totalSpent,
  ] = await Promise.all([
    prisma.rentalOrders.count({
      where: {
        userId,
      },
    }),

    prisma.rentalOrders.count({
      where: {
        userId,
        status: OrderStatus.PENDING,
      },
    }),

    prisma.rentalOrders.count({
      where: {
        userId,
        status: OrderStatus.CONFIRMED,
      },
    }),

    prisma.rentalOrders.count({
      where: {
        userId,
        status: OrderStatus.PICKED_UP,
      },
    }),

    prisma.rentalOrders.count({
      where: {
        userId,
        status: OrderStatus.RETURNED,
      },
    }),

    prisma.rentalOrders.count({
      where: {
        userId,
        status: OrderStatus.CANCELLED,
      },
    }),

    prisma.rentalOrders.aggregate({
      where: {
        userId,
        status: {
          not: OrderStatus.CANCELLED,
        },
      },
      _sum: {
        totalAmount: true,
      },
    }),
  ]);

  return {
    orders: {
      total: totalOrders,
      pending: pendingOrders,
      confirmed: confirmedOrders,
      pickedUp: pickedUpOrders,
      returned: returnedOrders,
      cancelled: cancelledOrders,
    },
    payments: {
      totalSpent: totalSpent._sum.totalAmount ?? 0,
    },
  };
};

export const UserServices = {
  getUserSummary,
};