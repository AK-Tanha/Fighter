import { Request, Response } from "express";
import { AppDataSource } from "../lib/data-source.js";
import { Fighter } from "../entities/Fighter.js";

const fighterRepo = AppDataSource.getRepository(Fighter);

export const getFighters = async (req: Request, res: Response) => {
   const fighters = await fighterRepo.find();
   res.status(200).json({
       success: true,
       message: "Fighters fetched successfully",
       data: fighters
   })
};


export const createFighter = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, nickname, nationality, club, date_of_birth, weight_class, weight, gender } = req.body;
        const fighter = await fighterRepo.save(
            fighterRepo.create({
                name,
                nickname,
                nationality,
                club,
                date_of_birth,
                gender,
                weight_class,
                weight: {
                    value: weight.value,
                    updated_at: new Date()
                }
            })
        );
        res.status(201).json({
            success: true,
            message: "Fighter created successfully",
            data: fighter
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating fighter",

        })
    }
};

export const getFighterById = async (req: Request, res: Response) => {
    try {
        const id  = Number(req.params.id);
        const fighter = await fighterRepo.findOneBy({ id });
        if (!fighter) {
            return res.status(404).json({
                success: false,
                message: "Fighter not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Fighter found",
            data: fighter
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching fighter"
        });
    }
};

export const editFighter = async (req: Request, res: Response) => {
    try {
        const id  = Number(req.params.id);
        const { name, nickname, nationality, club, date_of_birth, weight_class, weight, gender } = req.body;
        const fighter = await fighterRepo.update(
            { id },
            {
                name,
                nickname,
                nationality,
                club,
                date_of_birth,
                weight_class,
                gender,
                weight: {
                    value: weight.value,
                    updated_at: new Date()
                }
            }
        );
        res.status(200).json({
            success: true,
            message: "Fighter updated successfully",
            data: Fighter
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating fighter"
        });
    }
};

export const deleteFighter = async (req: Request, res: Response) => {
    try {
        const id  = Number(req.params.id);
        const fighter = await fighterRepo.delete({
            id
        });
        res.status(200).json({
            success: true,
            message: "Fighter deleted successfully",
            data: fighter
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting fighter"
        });
    }
};