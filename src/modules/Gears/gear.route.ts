import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { gearController } from "./gear.controller";

const router = Router();

router.get('/', gearController.getAllGear);
router.get('/:id', gearController.getGearDetails);

export const gearRouter = router;