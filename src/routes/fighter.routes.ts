import { Router } from "express";
import { createFighter, getFighters, getFighterById, editFighter, deleteFighter } from "../controllers/fighter.controller.js";

const router = Router();

router.get("/", getFighters);
router.post("/", createFighter);
router.get("/:id", getFighterById);
router.put("/:id", editFighter);
router.delete("/:id", deleteFighter);

export default router;