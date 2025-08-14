import * as appUserController from "../controllers/appUserController.js"
import * as homepageController from "../controllers/homepageController.js"
import * as heroController from "../controllers/heroController.js"
import * as authController from "../controllers/authController.js"
import { isLogged } from "../middlewares/permissionMiddleware.js"
import { Router } from "express";

export const router = Router();

router.get('/users', appUserController.getAll)
router.get('/users/:id', appUserController.getOne)

router.get('/homepage/first', homepageController.getFirstHeroes)
router.get('/homepage/last', homepageController.getLastHeroes)

router.get('/heroes', heroController.getAll)
router.get('/heroes/:id', heroController.getOne)
router.post('/heroes', heroController.createOne)
router.patch('/heroes/:id', isLogged, heroController.updateOneById)
router.delete('/heroes/:id', isLogged, heroController.deleteOneById)

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post('/logout', isLogged, authController.logout)
router.get("/auth/me", isLogged, authController.authMe)