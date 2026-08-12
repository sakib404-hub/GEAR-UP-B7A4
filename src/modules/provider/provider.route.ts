import { Router } from "express";
import { providerController } from "./provider.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router  = Router();


//? done
router.post("/gear",auth(UserRole.PROVIDER, UserRole.ADMIN), providerController.createGear);

//? done
router.put("/gear/:id",auth(UserRole.PROVIDER, UserRole.ADMIN), providerController.updateGear);

//? done
router.delete("/gear/:id",auth(UserRole.PROVIDER, UserRole.ADMIN), providerController.deleteGear);

//? done
router.get('/gear', auth(UserRole.PROVIDER), providerController.getProviderGears)


// Orders

//? done
router.get("/orders",auth(UserRole.PROVIDER), providerController.getIncomingOrders);


//? updating order is left
router.patch("/orders/:id",auth(UserRole.PROVIDER, UserRole.ADMIN), providerController.updateOrderStatus);


export const providerRouter = router;