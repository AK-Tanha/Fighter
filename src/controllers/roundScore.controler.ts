import { AppDataSource } from "../lib/data-source.js";
import { Request, Response } from "express";
import { RoundScore } from "../entities/RoundScore.js";
import { Official } from "../entities/Official.js";
import { Round } from "../entities/Round.js";

const roundScoreRepo = AppDataSource.getRepository(RoundScore);
const roundRepo = AppDataSource.getRepository(Round);
const officialRepo = AppDataSource.getRepository(Official);

export const getRoundScores = async (req: Request, res: Response) => {
    const roundScores = await roundScoreRepo.find();
    res.status(200).json({ success: true, message: "Round scores fetched successfully", data: roundScores });
};

export const createRoundScore = async (req: Request, res: Response) => {
    try {
        const { round, official, red_score, blue_score } = req.body;

        const scoreRound = await roundRepo.findOneBy({ id: round });
        if (!scoreRound) {
            return res.status(404).json({ success: false, message: "Round not found" });
        }
        const scoreOfficial = await officialRepo.findOneBy({ id: official });
        if (!scoreOfficial) {
            return res.status(404).json({ success: false, message: "Official not found" });
        }

        const roundScore = roundScoreRepo.create({
            round: scoreRound,
            official: scoreOfficial,
            red_score,
            blue_score
        });
        await roundScoreRepo.save(roundScore);
        res.status(201).json({ success: true, message: "Round score created successfully", data: roundScore });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating round score" });
    }
};

export const getRoundScoreById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const roundScore = await roundScoreRepo.findOne({ where: { id } });
        if (!roundScore) {
            return res.status(404).json({ success: false, message: "Round score not found" });
        }
        res.status(200).json({ success: true, message: "Round score fetched successfully", data: roundScore });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching round score" });
    }
};

export const updateRoundScore = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { red_score, blue_score } = req.body;
        const roundScore = await roundScoreRepo.findOne({
            where: { id },
            relations: { round: true, official: true }
        });
        if (!roundScore) {
            return res.status(404).json({ success: false, message: "Round score not found" });
        }
        Object.assign(roundScore, { red_score, blue_score });
        await roundScoreRepo.save(roundScore);
        res.status(200).json({ success: true, message: "Round score updated successfully", data: roundScore });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating round score" });
    }
};

export const deleteRoundScore = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const roundScore = await roundScoreRepo.findOne({ where: { id } });
        if (!roundScore) {
            return res.status(404).json({ success: false, message: "Round score not found" });
        }
        await roundScoreRepo.remove(roundScore);
        res.status(200).json({ success: true, message: "Round score deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting round score" });
    }
};
