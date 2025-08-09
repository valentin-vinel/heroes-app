import * as appUserController from "../controllers/appUserController.js"
import * as heroController from "../controllers/heroController.js"
import { Router } from "express";

export const router = Router();

router.get('/users', appUserController.getAll)
router.get('/users/:id', appUserController.getOne)

router.get('/heroes', heroController.getAll)
router.get('/heroes/:id', heroController.getOne)
router.post('/heroes', heroController.createOne)
router.patch('/heroes/:id', heroController.updateOneById)
router.delete('/heroes/:id', heroController.deleteOneById)