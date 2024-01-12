import { NextFunction } from 'express';
import { Response } from 'express'
import usersSchema from "../models/users.model.js";
import { auth } from '../../main.js';

export const authMiddleware = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const authorization = req.headers.authorization ?? '';
    const idToken = authorization.split(' ')[1] ?? '';
    if (idToken == null || idToken === '') {
        next();
        return
    }
    const decodedToken = await auth.verifyIdToken(idToken);
    const user = await usersSchema.findOne({ email: decodedToken.email });
    req.user = user;
    next();
}