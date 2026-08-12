import { OrderStatus } from "../../../generated/prisma/enums";
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

const deleteGear = async (gearId: string, userId: string, isAdmin: boolean) => {
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
    throw new Error("Forbidden Access.");
  }

  await prisma.gearItems.delete({
    where: {
      id: gearId
    }
  })
  return null;

};

const getIncomingOrders = async (providerId: string) => {
  const orders = await prisma.rentalOrders.findMany({
    where: {
      gear: {
        providerId: providerId
      }
    },
    include : {
      gear : true
    }
  });

  return orders;
};

const updateOrderStatus = async (
  providerId: string,
  orderId: string,
  status: OrderStatus,
  isAdmin: boolean
) => {

  let normalizedStatus: OrderStatus;

  if (status.toLowerCase() === "pending") {
    normalizedStatus = OrderStatus.PENDING;
  } else if (status.toLowerCase() === "confirmed") {
    normalizedStatus = OrderStatus.CONFIRMED;
  } else if (status.toLowerCase() === "picked_up") {
    normalizedStatus = OrderStatus.PICKED_UP;
  } else if (status.toLowerCase() === "returned") {
    normalizedStatus = OrderStatus.RETURNED;
  } else if (status.toLowerCase() === "cancelled") {
    normalizedStatus = OrderStatus.CANCELLED;
  } else {
    throw new Error(
      "Invalid order status. Allowed values are: pending, confirmed, picked_up, returned, cancelled."
    );
  }

  const order = await prisma.rentalOrders.findUnique({
    where: {
      id: orderId
    },
    include: {
      gear: {
        select: {
          providerId: true
        }
      }
    }
  })

  if (!order) {
    throw new Error("Order does not exist!");
  }

  if (order.gear.providerId !== providerId && !isAdmin) {
    throw new Error("Access Denied!");
  }

  if (
    normalizedStatus === OrderStatus.RETURNED &&
    order.status !== OrderStatus.PICKED_UP
  ) {
    throw new Error("Only picked up orders can be marked as returned.");
  }

  if (order.status === OrderStatus.RETURNED) {
    throw new Error("Returned orders cannot be updated.");
  }

  if (normalizedStatus === OrderStatus.RETURNED) {
    await prisma.rentalOrders.update({
      where: {
        id: orderId
      },
      data: {
        gear: {
          update: {
            stockQuantity: {
              increment: 1
            }
          }
        }
      }
    })
  }

  const updatedOrder = await prisma.rentalOrders.update({
    where: {
      id: orderId,
      gear: {
        providerId
      }
    },
    data: {
      status: normalizedStatus
    }
  })

  return updatedOrder;

};


const getProviderGears = async(providerId : string)=>{
  const result = await prisma.gearItems.findMany({
    where : {
      providerId : providerId
    },
    include : {
      provider : {
        omit : {
          password : true
        }
      }
    }
  })

  return result;
}

const getProviderSummary = async (providerId: string) => {
  const [
    totalGears,
    availableGears,
    unavailableGears,
    totalOrders,
    pendingOrders,
    confirmedOrders,
    pickedUpOrders,
    returnedOrders,
    cancelledOrders,
    totalEarnings,
  ] = await Promise.all([
    // Total gears
    prisma.gearItems.count({
      where: {
        providerId,
      },
    }),

    // Available gears
    prisma.gearItems.count({
      where: {
        providerId,
        status: "AVAILABLE",
      },
    }),

    // Unavailable gears
    prisma.gearItems.count({
      where: {
        providerId,
        status: "UNAVAILABLE",
      },
    }),

    // Total rental orders
    prisma.rentalOrders.count({
      where: {
        gear: {
          providerId,
        },
      },
    }),

    // Pending orders
    prisma.rentalOrders.count({
      where: {
        gear: {
          providerId,
        },
        status: OrderStatus.PENDING,
      },
    }),

    // Confirmed orders
    prisma.rentalOrders.count({
      where: {
        gear: {
          providerId,
        },
        status: OrderStatus.CONFIRMED,
      },
    }),

    // Picked up / active rentals
    prisma.rentalOrders.count({
      where: {
        gear: {
          providerId,
        },
        status: OrderStatus.PICKED_UP,
      },
    }),

    // Returned / completed rentals
    prisma.rentalOrders.count({
      where: {
        gear: {
          providerId,
        },
        status: OrderStatus.RETURNED,
      },
    }),

    // Cancelled orders
    prisma.rentalOrders.count({
      where: {
        gear: {
          providerId,
        },
        status: OrderStatus.CANCELLED,
      },
    }),

    // Total earnings
    prisma.rentalOrders.aggregate({
      where: {
        gear: {
          providerId,
        },
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
    gears: {
      total: totalGears,
      available: availableGears,
      unavailable: unavailableGears,
    },

    orders: {
      total: totalOrders,
      pending: pendingOrders,
      confirmed: confirmedOrders,
      pickedUp: pickedUpOrders,
      returned: returnedOrders,
      cancelled: cancelledOrders,
    },

    earnings: {
      total: totalEarnings._sum.totalAmount ?? 0,
    },
  };
};

export const providerServices = {
  createGear,
  updateGear,
  deleteGear,
  getIncomingOrders,
  updateOrderStatus,
  getProviderGears,
  getProviderSummary
};