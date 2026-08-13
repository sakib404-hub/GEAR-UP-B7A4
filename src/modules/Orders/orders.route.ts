import { Router } from "express";
import { orderController } from "./orders.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

//? done
router.post('/',auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.PROVIDER), orderController.createOrder);

//? done
router.get('/',auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.PROVIDER), orderController.getUsersRentalOrders);

//?
router.get('/completed',auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.PROVIDER), orderController.getUsersCompletedOrders);


//? done
router.get('/:id',auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.PROVIDER), orderController.getOrderDetails);



export const orderRouter = router;