import { Router } from "express";
import {getRoundScores, createRoundScore, getRoundScoreById, updateRoundScore, deleteRoundScore} from "../controllers/roundScore.controler.js";
const router = Router();

router.get("/", getRoundScores);
router.post("/", createRoundScore);
router.get("/:id", getRoundScoreById);
router.put("/:id", updateRoundScore);
router.delete("/:id", deleteRoundScore);

export default router;