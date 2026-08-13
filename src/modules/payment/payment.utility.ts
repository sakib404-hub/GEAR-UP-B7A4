import Stripe from "stripe";
import stripe from "../../lib/stripe";
import { prisma } from "../../lib/prisma";

export const handleCheckoutSessionComplete = async (
  session: Stripe.Checkout.Session
) => {
  if (!session.payment_intent) {
    throw new Error("Payment intent not found in checkout session");
  }

  const orderId = session.metadata?.orderId;

  if (!orderId) {
    throw new Error("Order ID missing from Stripe session metadata");
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(
    session.payment_intent as string,
    {
      expand: ["latest_charge", "payment_method"],
    }
  );

  const charge = paymentIntent.latest_charge as Stripe.Charge;

  const paymentInformation = {
    rentalId: orderId,
    transactionId: paymentIntent.id,
    amount: paymentIntent.amount / 100,
    method: session.payment_method_types[0]!,
    paidAt: new Date(charge.created * 1000),
  };

  await prisma.$transaction(async (tx) => {
    // Check whether this payment was already processed
    const existingPayment = await tx.payment.findUnique({
      where: {
        transactionId: paymentIntent.id,
      },
    });

    if (existingPayment) {
      console.log(
        `Payment ${paymentIntent.id} already processed.`
      );

      return;
    }

    const order = await tx.rentalOrders.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      throw new Error(`Rental order ${orderId} not found`);
    }

    if (order.isPaid) {
      console.log(`Order ${orderId} is already paid.`);
      return;
    }

    await tx.rentalOrders.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
      },
    });

    await tx.gearItems.update({
      where: {
        id: order.gearId,
      },
      data: {
        stockQuantity: {
          decrement: 1,
        },
      },
    });

    await tx.payment.create({
      data: {
        ...paymentInformation
      }
    });
  });

  return {
    success: true,
    transactionId: paymentIntent.id,
    orderId,
  };
};