
import { Router } from "express";
import UserRoute from "./userRoutes.js";
import AccountRoute from "./account.js";

const router = Router();

router.use("/user", UserRoute);
router.use('/account', AccountRoute);

export default router;