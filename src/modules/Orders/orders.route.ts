import { Router } from "express";
import { orderController } from "./orders.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post('/',auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.PROVIDER), orderController.createOrder);



export const orderRouter = router;