import { Request, Response } from "express";
import { AppDataSource } from "../lib/data-source.js";
import { Official } from "../entities/Official.js";

const officialRepo = AppDataSource.getRepository(Official);

export const getReferees = async (req: Request, res: Response) => {
   const referees = await officialRepo.find();
   res.status(200).json({
       success: true,
       message: "Referees fetched successfully",
       data: referees
   })
};

export const createReferee = async (
    req: Request,
    res: Response
) => {
    try {
        const { name,nationality, date_of_birth, is_active } = req.body;
        const referee = await officialRepo.save(
            officialRepo.create({
                name,
                nationality,
                date_of_birth,
                is_active
            })
        );
        res.status(201).json({
            success: true,
            message: "Referee created successfully",
            data: referee
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating referee",
        })
    }
};

export const getRefereeById = async (req: Request, res: Response) => {
    try {
        const id  = Number(req.params.id);
        const referee = await officialRepo.findOneBy({ id });
        if (!referee) {
            return res.status(404).json({
                success: false,
                message: "Referee not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Referee found",
            data: referee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching referee"
        });
    }
};

export const editReferee = async (req: Request, res: Response) => {
    try {
        const id  = Number(req.params.id);
        const { name, nationality, date_of_birth, is_active } = req.body;
        const referee = await officialRepo.update(
            { id },
            {
                name,
                nationality,
                date_of_birth,
                is_active
            }
        );
        res.status(200).json({
            success: true,
            message: "Referee updated successfully",
            data: referee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating referee"
        });
    }
};

export const deleteReferee = async (req: Request, res: Response) => {
    try {
        const id  = Number(req.params.id);
        const referee = await officialRepo.delete({
            id
        });
        res.status(200).json({
            success: true,
            message: "Referee deleted successfully",
            data: referee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting referee"
        });
    }
};