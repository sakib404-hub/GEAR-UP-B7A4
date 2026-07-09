import status from "http-status";
import { OrderStatus } from "../../../generated/prisma/enums";
import { config } from "../../config/config";
import { prisma } from "../../lib/prisma"
import stripe from "../../lib/stripe";

const createPayment = async (orderId: string, userId: string) => {
    const order = await prisma.rentalOrders.findUnique({
        where: {
            id: orderId,
        },
        include: {
            gear: true,
        },
    });

    const user = await prisma.user.findUnique({
        where : {
            id : order?.userId
        },
        select : {
            email : true
        }
    })

    if (!order) {
        throw new Error("Rental order not found.");
    }

    if (order.userId !== userId) {
        throw new Error(
            "You are not authorized to pay for this rental order."
        );
    }

    if (order.isPaid) {
        throw new Error(
            
            "This order has already been paid."
        );
    }

    if (order.status === OrderStatus.PENDING) {
        throw new Error(
            "This order has not been confirmed yet."
        );
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email : user?.email ,
        line_items: [
            {
                price_data: {
                    currency: "bdt",
                    product_data: {
                        name: order.gear.title,
                        description: order.gear.description,
                    },
                    unit_amount: order.totalAmount * 100,
                },
                quantity: 1,
            },
        ],
        metadata: {
            orderId: order.id,
            userId,
        },
        success_url: `${config.app_url}/payment?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.app_url}/cancel?success=false`,
    });

    return session.url;
};

const handlePaymentConfirmWebHook = async(event : Buffer, signature : string)=>{

} 

export const paymentServices = {
    createPayment,
    handlePaymentConfirmWebHook
}