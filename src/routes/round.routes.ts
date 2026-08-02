import { Router } from "express";
import { createRound, getRounds, getRoundById, updateRound, deleteRound } from "../controllers/round.controller.js";

const router = Router();

router.get("/", getRounds);
router.post("/", createRound);
router.get("/:id", getRoundById);
router.put("/:id", updateRound);
router.delete("/:id", deleteRound);

export default router;