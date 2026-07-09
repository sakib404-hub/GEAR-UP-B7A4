import { Router } from "express";
import { orderController } from "./orders.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post('/',auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.PROVIDER), orderController.createOrder);


router.get('/',auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.PROVIDER), orderController.getUsersRentalOrders )



export const orderRouter = router;