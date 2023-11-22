import { NextFunction, Request,Response } from "express";
import createHttpError from "http-errors";
import { AnyZodObject } from "zod/lib";

export const validateRequest = (schema:AnyZodObject)=>
     (req:Request,res:Response,next:NextFunction)=>{
        try {
           
            schema.parse({
                body:req.body,
                params:req.params,
                query:req.query
            })
            next();
        } catch (error:any) {
            console.log(error)
            next(createHttpError(400,error.errors))
        }
    }
