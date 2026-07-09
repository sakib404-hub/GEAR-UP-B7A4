import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.post('/create/:orderId', paymentController.createPayment)

export const paymentRouter = router;