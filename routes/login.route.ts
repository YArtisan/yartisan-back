import express from "express";
import usersSchema from '../models/users.model'
import { secret } from '../config/secret.js'
import jsonwebtoken from 'jsonwebtoken'
// import bcrypt from 'bcrypt'


export default function (app: any) {

	const jsonMiddleware = express.json();

	app.post('/login', jsonMiddleware, (req, res) => {

		if (!req.body.username || !req.body.password) return res.status(400).json({ message: 'Il manque un truc' });

		try {
			const user = usersSchema.findOne(u => u.username === req.body.username && u.password === req.body.password);
			if (!user) return res.status(400).json({ message: 'User pas trouve' });

			const token = jsonwebtoken.sign({
				id: user['id'],
				username: user['username']
			}, secret, { expiresIn: '3 hours' });

			res.json({ access_token: token });
		} catch (error) {
			res.json({ access_token: error });
		}
	});
}