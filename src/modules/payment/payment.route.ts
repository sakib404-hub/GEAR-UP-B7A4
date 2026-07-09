import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post('/create/:orderId',auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), paymentController.createPayment)

router.post('/confirm', paymentController.handlePaymentConfirmWebHook)
export const paymentRouter = router;