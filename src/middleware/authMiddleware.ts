import { NextFunction } from 'express';
import { Response } from 'express'
import usersSchema from "../models/users.model.js";
import { auth } from '../../main.js';
import artisantModel from '../models/artisant.model.js';

export const authMiddleware = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const authorization = req.headers.authorization ?? '';
    const idToken = authorization.split(' ')[1] ?? '';
    if (idToken == null || idToken === '') {
        next();
        return
    }
    const decodedToken = await auth.verifyIdToken(idToken)
    let email: string = decodedToken.email ?? ''
    if ('google.com' === decodedToken.firebase.sign_in_provider) {
        const authUser = await auth.getUser(decodedToken.uid)
        email = authUser.providerData[0].email
    }
    const [user, artisan] = await Promise.all([
        usersSchema.findOne({ email }),
        artisantModel.findOne({ email })
    ])

    req.user = user ?? artisan;
    next();
}