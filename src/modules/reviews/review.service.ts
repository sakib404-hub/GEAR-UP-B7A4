import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"
import { IreviewPayLoad } from "./review.interface"

const creatReview = async(reviewPayLoad : IreviewPayLoad,  orderId : string , userId : string)=>{

    const order = await prisma.rentalOrders.findUnique({
        where : {
            id : orderId
        },
        include : {
            gear : {
                select : {
                    id : true,
                }
            }
        }
    })

    if(reviewPayLoad.rating > 5){
        throw new Error("Reviews Raing can not be greater then 5.")
    }

    if(!order){
        throw new Error("Order not found!");
    }

    if(order.userId !== userId){
        throw new Error("Access Denied!");
    }

    if(order.status !== OrderStatus.RETURNED){
        throw new Error("You can only give review after returning it!");
    }

    const result = await prisma.reviews.create({
        data : {
            ...reviewPayLoad,
            userId,
            gearId : order.gear.id
        }
    })

    return result;

}

export const reviewServices = {
    creatReview
}