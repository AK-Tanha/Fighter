import { Bout } from "../entities/Bout.js";
import { Fighter } from "../entities/Fighter.js";
import { Official } from "../entities/Official.js";
import { Event } from "../entities/Event.js";
import { Request, Response } from "express";
import { AppDataSource } from "../lib/data-source.js";
import { In } from "typeorm";


const boutRepo = AppDataSource.getRepository(Bout);
const fighterRepo = AppDataSource.getRepository(Fighter);
const eventRepo = AppDataSource.getRepository(Event);
const officialRepo = AppDataSource.getRepository(Official);

export const getBouts = async (req: Request, res: Response) => {
    const bouts = await boutRepo.find();
    res.status(200).json({
        success: true,
        message: "Bouts fetched successfully",
        data: bouts
    })

};

export const createBout = async (req: Request, res: Response) => {
    try {
        const { red_corner_fighter, blue_corner_fighter, event, referee, judges, is_title_fight, is_main_event, is_co_main_event, no_of_rounds, round_time } = req.body;
        const redFighter = await fighterRepo.findOneBy({ id: red_corner_fighter });
        if (!redFighter) {
            return res.status(404).json({ success: false, message: "Red corner fighter not found" });
        }
        const blueFighter = await fighterRepo.findOneBy({ id: blue_corner_fighter });
        if (!blueFighter) {
            return res.status(404).json({ success: false, message: "Blue corner fighter not found" });
        }
        const boutEvent = await eventRepo.findOneBy({ id: event });
        if (!boutEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        const boutReferee = await officialRepo.findOneBy({ id: referee });
        if (!boutReferee) {
            return res.status(404).json({ success: false, message: "Referee not found" });
        }
        const boutJudges = await officialRepo.findBy({ id: In(judges) });
        if (boutJudges.length !== judges.length) {
            return res.status(404).json({ success: false, message: "One or more judges not found" });
        }
        const bout = await boutRepo.save(
            boutRepo.create({
                red_corner_fighter: redFighter,
                blue_corner_fighter: blueFighter,
                event: boutEvent,
                referee: boutReferee,
                judges: boutJudges,
                is_title_fight,
                is_main_event,
                is_co_main_event,
                no_of_rounds,
                round_time
            })
        );

        res.status(201).json({
            success: true,
            message: "Bout created successfully",
            data: bout
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating bout",
            error
        });
    }
};


/* bout result */

async function determineWinner(boutId: number) {
    const bout = await boutRepo.findOne({
        where: { id: boutId },
        relations: { rounds: { scores: { official: true } } }
    });
    if (!bout) throw new Error('Bout not found');

    if (bout.win_method === 'tko' || bout.win_method === 'ko') {
        return { winner: bout.winner, method: bout.win_method, ending_round: bout.ending_round };
    }

    const judgeTotals: Record<number, { name: string; red: number; blue: number }> = {};
    for (const round of bout.rounds) {
        for (const score of round.scores) {
            const oid = score.official.id;
            if (!judgeTotals[oid]) judgeTotals[oid] = { name: score.official.name, red: 0, blue: 0 };
            judgeTotals[oid].red += score.red_score;
            judgeTotals[oid].blue += score.blue_score;
        }
    }

    // Each judge's individual verdict
    const verdicts = Object.values(judgeTotals).map((j) => {
        if (j.red > j.blue) return 'red';
        if (j.blue > j.red) return 'blue';
        return 'draw';
    });

    const redCount = verdicts.filter((v) => v === 'red').length;
    const blueCount = verdicts.filter((v) => v === 'blue').length;
    const drawCount = verdicts.filter((v) => v === 'draw').length;

    let winner: 'red' | 'blue' | 'draw';
    let decisionType: 'unanimous' | 'split' | 'majority' | 'majority_draw' | 'split_draw';

    if (redCount === 3 || blueCount === 3) {
        winner = redCount === 3 ? 'red' : 'blue';
        decisionType = 'unanimous';
    } else if (redCount === 2 && drawCount === 1) {
        winner = 'red';
        decisionType = 'majority';
    } else if (blueCount === 2 && drawCount === 1) {
        winner = 'blue';
        decisionType = 'majority';
    } else if (redCount === 2 && blueCount === 1) {
        winner = 'red';
        decisionType = 'split';
    } else if (blueCount === 2 && redCount === 1) {
        winner = 'blue';
        decisionType = 'split';
    } else if (drawCount === 2) {
        winner = 'draw';
        decisionType = 'majority_draw';
    } else if (redCount === 1 && blueCount === 1 && drawCount === 1) {
        winner = 'draw';
        decisionType = 'split_draw';
    } else {
        // drawCount === 3
        winner = 'draw';
        decisionType = 'unanimous' as any; // "unanimous draw" — see note below
    }

    return { winner, method: 'decision', decisionType, judgeTotals };
};

export const recordStoppage = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { winner, win_method, ending_round } = req.body;
        // winner: 'red' | 'blue', win_method: 'tko' | 'ko'

        const bout = await boutRepo.findOne({ where: { id } });
        if (!bout) {
            return res.status(404).json({ success: false, message: "Bout not found" });
        }

        Object.assign(bout, { winner, win_method, ending_round, is_completed: true });
        await boutRepo.save(bout);

        res.status(200).json({ success: true, message: "Stoppage recorded", data: bout });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error recording stoppage" });
    }
};

/* get bout result */
export const getBoutResult = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await determineWinner(id);
        res.status(200).json({ success: true, message: "Result calculated", data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error calculating result" });
    }
};



/* get bout by id */

export const getBoutById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const bout = await boutRepo.findOne({
            where: { id },
            relations: {
                red_corner_fighter: true,
                blue_corner_fighter: true,
                event: true,
                referee: true,
                judges: true,
                rounds: {
                    scores: {
                        official: true
                    }
                }
            }
        });
        if (!bout) {
            return res.status(404).json({ success: false, message: "Bout not found" });
        }
        const responseData = {
            ...bout,
            rounds: bout.rounds.map((round) => ({
                id: round.id,
                round_number: round.round_number,
                red_knockdown: round.red_knockdown,
                blue_knockdown: round.blue_knockdown,
                judges_scores: round.scores.map((score) => ({
                    judge_name: score.official.name,
                    red_score: score.red_score,
                    blue_score: score.blue_score
                }))
            }))
        };

        res.status(200).json({ success: true, message: "Bout found", data: responseData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching bout", error });
    }
};

export const updateBout = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { red_corner_fighter, blue_corner_fighter, event, referee, judges, is_title_fight, is_main_event, is_co_main_event, no_of_rounds, round_time } = req.body;

        const bout = await boutRepo.findOne({ where: { id } });
        if (!bout) {
            return res.status(404).json({ success: false, message: "Bout not found" });
        }

        const redFighter = await fighterRepo.findOneBy({ id: red_corner_fighter });
        if (!redFighter) {
            return res.status(404).json({ success: false, message: "Red corner fighter not found" });
        }
        const blueFighter = await fighterRepo.findOneBy({ id: blue_corner_fighter });
        if (!blueFighter) {
            return res.status(404).json({ success: false, message: "Blue corner fighter not found" });
        }
        const boutEvent = await eventRepo.findOneBy({ id: event });
        if (!boutEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        const boutReferee = await officialRepo.findOneBy({ id: referee });
        if (!boutReferee) {
            return res.status(404).json({ success: false, message: "Referee not found" });
        }
        const boutJudges = await officialRepo.findBy({ id: In(judges) });
        if (boutJudges.length !== judges.length) {
            return res.status(404).json({ success: false, message: "One or more judges not found" });
        }

        Object.assign(bout, {
            red_corner_fighter: redFighter,
            blue_corner_fighter: blueFighter,
            event: boutEvent,
            referee: boutReferee,
            judges: boutJudges,
            is_title_fight,
            is_main_event,
            is_co_main_event,
            no_of_rounds,
            round_time
        });

        await boutRepo.save(bout);

        res.status(200).json({
            success: true,
            message: "Bout updated successfully",
            data: bout
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating bout", error });
    }
};


export const deleteBout = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const bout = await boutRepo.delete({
            id
        });
        res.status(200).json({
            success: true,
            message: "Bout deleted successfully",
            data: bout
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting bout"
        });
    }
};