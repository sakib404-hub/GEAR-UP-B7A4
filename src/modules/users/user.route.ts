import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get('/summary', auth(UserRole.CUSTOMER), userController.getUserSummary)
router.patch('/update', auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.PROVIDER), userController.updateUserInformation);

export const userRouter = router;