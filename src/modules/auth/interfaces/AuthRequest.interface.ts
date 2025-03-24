import { Request } from "express";
import {IJwtPayload} from "../../token/interfaces/jwtPayload";

export interface AuthRequest extends Request{
    user: IJwtPayload
}