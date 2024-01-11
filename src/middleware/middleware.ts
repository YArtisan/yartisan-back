import { NextFunction } from 'express';
import { Request, Response } from 'express'
import userService from "../service/user.service.js"
import { auth } from '../../main.js';


export const authMiddleware = async  (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authorization = req.headers.authorization ?? '';
    const idToken = authorization.split(' ')[1] ?? '';

    const decodedToken = await auth.verifyIdToken(idToken);
    
    try {
        const user = await userService.getUserDataService(decodedToken.uid, res);
        res.status(200).send({user: user});

    } catch (e) {
        res.status(500).send({message: 'User non trouve'});
    }
}