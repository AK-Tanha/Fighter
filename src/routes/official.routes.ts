import { Router } from "express";
import { getOfficials, createOfficial, getOfficialById, editOfficial, deleteOfficial } from "../controllers/official.controller.js";
const router = Router();

router.get("/", getOfficials);
router.post("/", createOfficial);
router.get("/:id", getOfficialById);
router.put("/:id", editOfficial);
router.delete("/:id", deleteOfficial);

export default router;