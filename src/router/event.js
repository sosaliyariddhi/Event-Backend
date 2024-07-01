import express from "express";
import { create, deleteEvent, getAll, updateEvent } from "../controller/event.js";
import { authentication, isAdmin } from "../middleWare/middleWare.js";

const router = express.Router();

router.post("/create", authentication, create);

router.get("/getAll", authentication, getAll);

router.put("/update/:id", authentication, updateEvent);

router.delete("/delete/:id", authentication, deleteEvent);

export default router;
