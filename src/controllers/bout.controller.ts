import { Bout } from "../entities/Bout.js";
import { Request, Response } from "express";
import { AppDataSource } from "../lib/data-source.js";


const boutRepo = AppDataSource.getRepository(Bout);

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
        const bout = await boutRepo.save(
            boutRepo.create({
                red_corner_fighter,
                blue_corner_fighter,
                event,
                referee,
                judges,
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
        const bout = await boutRepo.update({ id }, {
            red_corner_fighter,
            blue_corner_fighter,
            event,
            referee,
            judges,
            is_title_fight,
            is_main_event,
            is_co_main_event
        });

        res.status(200).json({
            success: true,
            message: "Bout updated successfully",
            data: bout
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating bout",
            error
        });
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