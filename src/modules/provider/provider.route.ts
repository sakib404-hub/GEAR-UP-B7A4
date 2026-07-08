import { Router } from "express";
import { providerController } from "./provider.controller";

const router  = Router();


router.post("/gear", providerController.createGear);
router.put("/gear/:id", providerController.updateGear);
router.delete("/gear/:id", providerController.deleteGear);

// Orders
router.get("/orders", providerController.getIncomingOrders);
router.patch("/orders/:id", providerController.updateOrderStatus);


export const providerRouter = router;