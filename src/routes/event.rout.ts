import { Router } from "express";
import { getEvents, createEvent, getEventById, updateEvent, deleteEvent } from "../controllers/event.controler.js";

const router = Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;