import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post('/create/:orderId',auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), paymentController.createPayment)

router.get('/', auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), paymentController.getUsersPaymentsHistory);

router.get('/:id',auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), paymentController.getPaymentDetails )

router.post('/confirm', paymentController.handlePaymentConfirmWebHook);
export const paymentRouter = router;