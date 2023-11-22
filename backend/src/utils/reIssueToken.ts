import userModel from "../models/user.model";
import { signJwt, verifyJwt } from "./jwt.utils"

export const reIssueAccessToken = async (refreshToken:string) => {
const {decoded} = await verifyJwt(refreshToken);

 if(!decoded){
    return false;
 }

const user = await userModel.findById(decoded.id);
if(!user) return false;

const accessToken = signJwt({ id: user._id, name: user.username }, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
return accessToken;

}