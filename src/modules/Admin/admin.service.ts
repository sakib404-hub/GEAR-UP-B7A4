import { OrderStatus, UserStatus } from "../../../generated/prisma/enums";
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
    const result = await prisma.gearItems.findMany({
        include : {
            reviews :{
                select : {
                    id : true,
                    comment : true,
                    title : true
                }
            }
        }
    });
    return result;
};

const getAllRentals = async() => {
    const allRentalOrders = await prisma.rentalOrders.findMany();
    return allRentalOrders;
};

const getAdminSummery = async()=>{
    const [
    totalUsers,
    totalProviders,
    totalCustomers,
    totalCategories,
    totalGears,
    availableGears,
    unavailableGears,
    totalRentals,
    pendingRentals,
    confirmedRentals,
    ongoingRentals,
    completedRentals,
    cancelledRentals,
    totalPayments,
    paidOrders,
    unpaidOrders,
    revenueResult,
  ] = await Promise.all([
    // Users
    prisma.user.count(),

    // Providers
    prisma.user.count({
      where: {
        role: "PROVIDER",
      },
    }),

    // Customers
    prisma.user.count({
      where: {
        role: "CUSTOMER",
      },
    }),

    // Categories
    prisma.category.count(),

    // Gears
    prisma.gearItems.count(),

    // Available gears
    prisma.gearItems.count({
      where: {
        status: "AVAILABLE",
      },
    }),

    // Unavailable gears
    prisma.gearItems.count({
      where: {
        status: "UNAVAILABLE",
      },
    }),

    // Rentals
    prisma.rentalOrders.count(),

    // Rental statuses
    prisma.rentalOrders.count({
      where: {
        status: OrderStatus.PENDING,
      },
    }),

    prisma.rentalOrders.count({
      where: {
        status: OrderStatus.CONFIRMED,
      },
    }),

    prisma.rentalOrders.count({
      where: {
        status: OrderStatus.PICKED_UP,
      },
    }),

    prisma.rentalOrders.count({
      where: {
        status: OrderStatus.RETURNED,
      },
    }),

    prisma.rentalOrders.count({
      where: {
        status: OrderStatus.CANCELLED,
      },
    }),

    // Payments
    prisma.payment.count(),

    // Paid orders
    prisma.rentalOrders.count({
      where: {
        isPaid: true,
      },
    }),

    // Unpaid orders
    prisma.rentalOrders.count({
      where: {
        isPaid: false,
      },
    }),

    // Revenue
    prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
    }),
  ]);

  return {
    users: {
      total: totalUsers,
      providers: totalProviders,
      customers: totalCustomers,
    },

    categories: {
      total: totalCategories,
    },

    gears: {
      total: totalGears,
      available: availableGears,
      unavailable: unavailableGears,
    },

    rentals: {
      total: totalRentals,
      pending: pendingRentals,
      confirmed: confirmedRentals,
      ongoing: ongoingRentals,
      completed: completedRentals,
      cancelled: cancelledRentals,
    },

    payments: {
      total: totalPayments,
      paidOrders,
      unpaidOrders,
      totalRevenue: revenueResult._sum.amount ?? 0,
    },
  };
}

export const adminServices = {
  getAllUsers,
  updateUserStatus,
  getAllGear,
  getAllRentals,
  getAdminSummery
};