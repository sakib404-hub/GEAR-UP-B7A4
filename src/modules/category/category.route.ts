import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

router.post('/', categoryController.createCategory);
router.get('/', )

export const categoryRouter = router;