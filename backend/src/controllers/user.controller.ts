import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";
import { CreateUserInput, LoginUserInput } from "../schema/user.schema";
import createHttpError from "http-errors";
import { signJwt } from "../utils/jwt.utils";
import { JwtPayload } from "jsonwebtoken";

export const getUser = async (req: Request<{}>, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.findById((req.user as JwtPayload).id);
        if (!user) {
            throw createHttpError(404, 'No such user exists')
        }

        return res.status(200).json({
            message: user
        })
    } catch (error) {
        next(error)
    }
}


export const createUser = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;

        const isExist = await userModel.findOne({ email });

        if (isExist) {
            throw createHttpError(409, 'Email Already Exists');
        }

        const user = await userModel.create(req.body);
        return res.status(200).json({
            message: user
        })
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req: Request<{}, {}, LoginUserInput['body']>, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({
            email: email
        }).select('username password');
        if (!user) {
            throw createHttpError(404, 'No such user exist')
        }

        const matchPassword = await user.comparePassword(password);
        console.log(matchPassword)
        if (!matchPassword) {
            throw createHttpError(400, 'Password or Email do not match')
        }

        const accessToken = await signJwt({ id: user._id, name: user.username }, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        const refreshToken = await signJwt({ id: user._id, name: user.username }, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
        //  return res.status(200).json({
        //     message:"Successfully Logged In",
        //     token:accessToken,
        //     refreshToken,
        //     username:user.username
        //  })

        return res.status(200).cookie('token', accessToken, {
            expires: new Date(Date.now() + 60 * 1000),
            httpOnly: true
        }).json({
            message: "Successfully Logged In",
            refreshToken,
            username: user.username,
            token: accessToken,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const logOutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        return res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        }).json({
            message: "SuccessFully Logged Out"
        })
        // return res.status(200).json({
        //     message: "SuccessFully Logged Out"
        // })

    } catch (error) {
        next(error)
    }
}