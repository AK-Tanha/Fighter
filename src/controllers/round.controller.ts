import { AppDataSource } from "../lib/data-source.js";
import { Request, Response } from "express";
import { Round } from "../entities/Round.js";

const roundRepo = AppDataSource.getRepository(Round);

export const getRounds = async (req: Request, res: Response) => {
    const rounds = await roundRepo.find();
    res.status(200).json({ success: true, message: "Rounds fetched successfully", data: rounds });
};

export const createRound = async (req: Request, res: Response) => {
    try {
        const { bout, round_number, red_knockdown, blue_knockdown } = req.body;
        const round = roundRepo.create({
            bout,
            round_number,
            red_knockdown,
            blue_knockdown
        });
        await roundRepo.save(round);
        res.status(201).json({ success: true, message: "Round created successfully", data: round });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating round" });
    }
};

export const getRoundById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const round = await roundRepo.findOne({ where: { id } });
        if (!round) {
            return res.status(404).json({ success: false, message: "Round not found" });
        }
        res.status(200).json({ success: true, message: "Round fetched successfully", data: round });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching round" });
    }
};

export const updateRound = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { bout, round_number, red_knockdown, blue_knockdown } = req.body;
        const round = await roundRepo.findOne({ where: { id } });
        if (!round) {
            return res.status(404).json({ success: false, message: "Round not found" });
        }
        Object.assign(round, { bout, round_number, red_knockdown, blue_knockdown });
        await roundRepo.save(round);
        res.status(200).json({ success: true, message: "Round updated successfully", data: round });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating round" });
    }
};

export const deleteRound = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const round = await roundRepo.findOne({ where: { id } });
        if (!round) {
            return res.status(404).json({ success: false, message: "Round not found" });
        }
        await roundRepo.remove(round);
        res.status(200).json({ success: true, message: "Round deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting round" });
    }
};
