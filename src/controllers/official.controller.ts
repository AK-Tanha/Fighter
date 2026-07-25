import { Request, Response } from "express";
import { AppDataSource } from "../lib/data-source.js";
import { Official } from "../entities/Official.js";

const officialRepo = AppDataSource.getRepository(Official);

export const getOfficials = async (req: Request, res: Response) => {
   const officials = await officialRepo.find();
   res.status(200).json({
       success: true,
       message: "Officials fetched successfully",
       data: officials
   })
};

export const createOfficial = async (
    req: Request,
    res: Response
) => {
    try {
        const { name,nationality, date_of_birth, is_active, certified_roles } = req.body;
        const official = await officialRepo.save(
            officialRepo.create({
                name,
                nationality,
                date_of_birth,
                is_active,
                certified_roles,
            })
        );
        res.status(201).json({
            success: true,
            message: "Official created successfully",
            data: official
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating official",
        })
    }
};

export const getOfficialById = async (req: Request, res: Response) => {
    try {
        const id  = Number(req.params.id);
        const official = await officialRepo.findOneBy({ id });
        if (!official) {
            return res.status(404).json({
                success: false,
                message: "Official not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Official found",
            data: official
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching official"
        });
    }
};

export const editOfficial = async (req: Request, res: Response) => {
    try {
        const id  = Number(req.params.id);
        const { name, nationality, date_of_birth, is_active, certified_roles } = req.body;
        const official = await officialRepo.update(
            { id },
            {
                name,
                nationality,
                date_of_birth,
                is_active,
                certified_roles,
            }
        );
        res.status(200).json({
            success: true,
            message: "Official updated successfully",
            data: official
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating official"
        });
    }
};

export const deleteOfficial = async (req: Request, res: Response) => {
    try {
        const id  = Number(req.params.id);
        const official = await officialRepo.delete({
            id
        });
        res.status(200).json({
            success: true,
            message: "Official deleted successfully",
            data: official
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting official"
        });
    }
};