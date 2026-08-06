import { Request, Response } from "express";
import { AppDataSource } from "../lib/data-source.js";
import { Event } from "../entities/Event.js";
import { Bout } from "../entities/Bout.js";

const eventRepo = AppDataSource.getRepository(Event);
const boutRepo = AppDataSource.getRepository(Bout);

export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await eventRepo.find();
        res.status(200).json({ success: true, message: "Events fetched successfully", data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching events" });
    }
};


export const createEvent = async (req: Request, res: Response) => {
    try {
        const { title, sub_title, description, date, location } = req.body;
        const event = eventRepo.create({
            title,
            sub_title,
            description,
            date,
            location,

        });
        await eventRepo.save(event);
        res.status(201).json({ success: true, message: "Event created successfully", data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating event" });
    }
};


export const getEventById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const event = await eventRepo.findOne({
            where: { id },
            relations: {
                bouts: true
            }
        });
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.status(200).json({ success: true, message: "Event fetched successfully", data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching event" });
    }
};


export const updateEvent = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { title, sub_title, description, date, location } = req.body;
        const event = await eventRepo.findOne({
            where: { id }
        });
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        Object.assign(event, {
            title,
            sub_title,
            description,
            date,
            location,

        });
        await eventRepo.save(event);
        res.status(200).json({ success: true, message: "Event updated successfully", data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating event" });
    }
};



export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const event = await eventRepo.delete({
            id
        });
        res.status(200).json({
            success: true,
            message: "Event deleted successfully",
            data: event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting event"
        });
    }
};