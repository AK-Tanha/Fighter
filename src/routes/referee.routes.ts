import { Router } from "express";
import { getReferees, createReferee, getRefereeById, editReferee, deleteReferee } from "../controllers/referee.controller.js";

const router = Router();

router.get("/", getReferees);
router.post("/", createReferee);
router.get("/:id", getRefereeById);
router.put("/:id", editReferee);
router.delete("/:id", deleteReferee);

export default router;