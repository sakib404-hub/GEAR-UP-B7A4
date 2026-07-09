import Stripe from "stripe";
import stripe from "../../lib/stripe";
import { prisma } from "../../lib/prisma";

export const handleCheckoutSessionComplete = async (session: Stripe.Checkout.Session) => {
    // console.log(session);

    const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent as string, {
        expand: ["latest_charge", "payment_method"]
    })

    const charge = paymentIntent.latest_charge as Stripe.Charge;

    const paymentInformation = {
        rentalId: session?.metadata?.orderId!,
        transactionId: paymentIntent.id,
        amount: (paymentIntent.amount) / 100,
        method: session.payment_method_types[0]!,
        paidAt: new Date(charge.created * 1000)
    }

    const order = await prisma.rentalOrders.update({
        where: {
            id: paymentInformation.rentalId,
        },
        data: {
            isPaid: true,
        },
    });


    await prisma.$transaction(async (tx) => {

        await tx.gearItems.update({
            where: {
                id: order.gearId
            },
            data: {
                stockQuantity: {
                    decrement: 1
                }
            }
        })

        await tx.payment.create({
            data: {
                ...paymentInformation
            }
        })
    })
}