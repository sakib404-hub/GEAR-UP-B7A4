import { GearItemStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IPayLoad } from "./orders.interface"

const createOrder = async(payLoad : IPayLoad, userId : string)=>{
    const {gearId, rentalDays} = payLoad;

    //? validating rental Days
    if(rentalDays <= 0){
         throw new Error("Rental days must be at least 1.");
    }
    if(rentalDays > 14){
        throw new Error(`You can not rent gear for ${rentalDays} days`);
    }

    //? validating gears
    const gear = await prisma.gearItems.findUnique({
        where : {
            id : gearId
        }
    })

    if(!gear){
        throw new Error("Gear Not found!");
    }

    if(gear?.stockQuantity <= 0){
        throw new Error("Out of stock");
    }

    if(gear.status === GearItemStatus.UNAVAILABLE){
         throw new Error("This gear is currently unavailable.");
    }

    if(gear.providerId === userId){
         throw new Error("You cannot rent your own gear.");
    }

    const totalAmount = rentalDays * gear.pricePerDay;

    const result = await prisma.rentalOrders.create({
        data : {
            ...payLoad,
            userId,
            totalAmount
        }
    })

    return result;
}

export const orderServices = {
    createOrder
}