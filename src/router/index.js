import express from "express";
import userRouter from "./user.js";
import eventRouter from "./event.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/event", eventRouter);

export default router;
