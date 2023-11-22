import { Request } from 'express';
import { JwtPayload } from './jwt.utils';

declare module 'express' {
  interface Request {
    user?:string | JwtPayload
  }
}