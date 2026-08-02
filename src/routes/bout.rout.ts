import { Router } from "express";
import { createBout, getBouts, getBoutById, updateBout, deleteBout } from "../controllers/bout.controller.js";

const router = Router();

router.get("/", getBouts);
router.post("/", createBout);
router.get("/:id", getBoutById);
router.put("/:id", updateBout);
router.delete("/:id", deleteBout);

export default router;