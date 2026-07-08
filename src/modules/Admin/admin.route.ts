import { Router } from "express";
import { adminController } from "./admin.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

// User Management
router.get("/users",auth(UserRole.ADMIN), adminController.getAllUsers);
router.patch("/users/:id",auth(UserRole.ADMIN), adminController.updateUserStatus);

// Gear Management
router.get("/gear", adminController.getAllGear);

// Rental Management
router.get("/rentals",auth(UserRole.ADMIN), adminController.getAllRentals);

export const adminRouter = router;