import { Router } from "express";
import { reviewController } from "./review.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post('/:id',auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), reviewController.creatReview)

export const reviewRouter = router;