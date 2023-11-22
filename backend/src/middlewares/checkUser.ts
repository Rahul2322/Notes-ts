import e, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../utils/reIssueToken";


export const checkAuth =async (req:Request,res:Response,next:NextFunction) => {
   try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log('token',token)
    const refreshToken = Array.isArray(req.headers["x-refresh-token"]) ? req.headers["x-refresh-token"][0] : req.headers["x-refresh-token"];
    console.log('refresh',refreshToken)
    
    if(!token){
        throw createHttpError(401,"Unauthourized");
    }
    
    const isValidToken = await verifyJwt(token);
    const {decoded , expired} = isValidToken
    console.log(expired,'expired')
    if (decoded && !expired && decoded !== null){
        req.user = decoded
        next();
    }

    if(expired && refreshToken ){
        const newAccessToken = await reIssueAccessToken(refreshToken);
        console.log(newAccessToken,'newaccesstoken')
        if(newAccessToken){
            res.setHeader("x-access-token", newAccessToken);
            const result = await verifyJwt(newAccessToken) ;
            console.log(result)
            const {decoded} = result;
            if (decoded && decoded !== null){
                req.user = decoded
                next();
            }
        }
    }
    
    return;
   } catch (error) {
    next(error)
   }
}