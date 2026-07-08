import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();

// User Management
router.get("/users", adminController.getAllUsers);
router.patch("/users/:id", adminController.updateUserStatus);

// Gear Management
router.get("/gear", adminController.getAllGear);

// Rental Management
router.get("/rentals", adminController.getAllRentals);

export const adminRouter = router;