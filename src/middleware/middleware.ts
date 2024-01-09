import jsonwebtoken from 'jsonwebtoken'
import { secret } from '../../config/secret.js'
import admin from 'firebase-admin';
import { NextFunction } from 'express';
import fs from 'fs' 
import path from 'node:path'
import { Request } from 'express'
import userService from "../service/user.service.js"



const project = process.env.GCLOUD_PROJECT ?? ''
    const filePath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '');
    const serviceAccount = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    admin.initializeApp({
        
    })
export const auth = admin.auth()

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authorization = req.headers.authorization ?? ''
    const idToken = authorization.split(' ')[1] ?? ''

    const decodedToken = auth.verifyIdToken(idToken);
    decodedToken.then((user) => {
        userService.getUserDataService(user.uid, res)
    })
    
}

export const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') return false;

    const matches = headerValue.match(/(bearer)\s+(\S+)/i);
    return matches && matches[2];
}

export const checkTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization);

    if (!token) return res.status(401).json({message: 'Pas de token'});

    jsonwebtoken.verify(token, secret, (err, decodedToken) => {
        if (err) {
            res.status(401).json({message: 'Bad token'});
        } else {
            return next();
        }
    })
}
