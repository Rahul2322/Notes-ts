import { NextFunction, Request, Response } from "express";
import notesModel, { NotesInput } from "../models/notes.model";
import createHttpError from "http-errors";
import { CreateNotesInput, ReadNotesInput } from "../schema/notes.schema";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // throw (createHttpError(404, 'No Data found'));
        const notes = await notesModel.find({
            userId:(req.user as JwtPayload).id

        }).exec();
        if (!notes.length) {
            throw (createHttpError(404, 'No Data found'))
        }
        return res.status(200).json(notes)
    } catch (error) {
       
         next(error)
    }
}

export const getNotesById = async (req: Request<ReadNotesInput['params']>, res: Response, next: NextFunction) => {
    try {
        const noteId = req.params.notesId;
        const userId = (req.user as JwtPayload).id;

        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "Invalid note id");
        }
        const note = await notesModel.findById(noteId).exec();

        if (!note) {
            throw (createHttpError(404, 'No Data found'))
        }

        if(!note?.userId.equals(userId)){
            throw createHttpError(401, "You cannot access this note");
        }

        return res.status(200).json(note)

    } catch (error) {
        next(error)
    }
}

export const createNotes = async (req: Request<{}, {}, CreateNotesInput['body']>, res: Response, next: NextFunction) => {
    try {
        const {title,text} = req.body;
        const userId = (req.user as JwtPayload).id;

        const notes = await notesModel.create({
            title,
            text,
            userId
        });
        return res.status(201).json(notes)
    } catch (error) {
        next(error)
    }
}


export const updateNotes = async (req: Request<ReadNotesInput['params'], {}, CreateNotesInput['body']>, res: Response, next: NextFunction) => {
    try {
        const { title, text }: NotesInput = req.body;
        const userId = (req.user as JwtPayload).id;
        const noteId = req.params.notesId;

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const getNotes = await notesModel.findById(noteId);

        if (!getNotes) {
            throw (createHttpError(404, 'Not Found'))
        }

        if(!getNotes?.userId.equals(userId)){
            throw createHttpError(401, "You cannot access this note");
        }

        getNotes.title = title;
        getNotes.text = text;

        const updatedNote = await getNotes.save();

        return res.status(200).json(updatedNote)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const deleteNotes = async (req: Request<ReadNotesInput['params']>, res: Response, next: NextFunction) => {
    try {
        const notesId = req.params.notesId
        const note = await notesModel.findById(notesId);
        if (!note) {
            throw createHttpError(404, 'No such note exists')
        }
        await notesModel.deleteOne({ _id: notesId });
        return res.status(200).json({
            message: "Deleted Successfully!"
        })
    } catch (error) {
        next(error)
    }
}

