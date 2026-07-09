import { Router } from "express";
import { providerController } from "./provider.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router  = Router();


router.post("/gear",auth(UserRole.PROVIDER, UserRole.ADMIN), providerController.createGear);
router.put("/gear/:id",auth(UserRole.PROVIDER, UserRole.ADMIN), providerController.updateGear);
router.delete("/gear/:id",auth(UserRole.PROVIDER, UserRole.ADMIN), providerController.deleteGear);

// Orders
router.get("/orders",auth(UserRole.PROVIDER), providerController.getIncomingOrders);
router.patch("/orders/:id",auth(UserRole.PROVIDER, UserRole.ADMIN), providerController.updateOrderStatus);


export const providerRouter = router;