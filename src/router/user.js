import express from "express";
import { getAllOrganizer, register, signIn } from "../controller/user.js";
import { authentication, isAdmin } from "../middleWare/middleWare.js";

const router = express.Router();

router.post("/login", signIn);

router.post("/register", register);

router.get("/organizer/getAll", authentication, isAdmin, getAllOrganizer);

export default router;
