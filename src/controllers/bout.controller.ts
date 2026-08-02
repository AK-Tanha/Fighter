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
        const { red_corner_fighter, blue_corner_fighter, event, referee, judges, is_title_fight, is_main_event, is_co_main_event } = req.body;
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
                is_co_main_event
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

export const getBoutById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const bout = await boutRepo.findOneBy({ id });
        if (!bout) {
            return res.status(404).json({
                success: false,
                message: "Bout not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Bout found",
            data: bout
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching bout",
            error
        });
    }
};

export const updateBout = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { red_corner_fighter, blue_corner_fighter, event, referee, judges, is_title_fight, is_main_event, is_co_main_event } = req.body;

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
            is_co_main_event
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