import express from 'express';
import bodyParser from 'body-parser';
import { connect } from 'mongoose';
import config from './env.json' assert { type: "json" };

const app = express();

const rawJsonMiddleware = bodyParser.raw({ type: 'application/json' });
const jsonMiddleware = express.json();

// Ajouter des en-têtes CORS à toutes les requêtes
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

// Connect to mongoDb
connect(config.mongoDb_url, {
		maxPoolSize: 10,
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('Failed to connect to MongoDB', err));

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));

// Register new members (/register)
app.post('/register', jsonMiddleware, (req, res) => {
});

// Export the Express API
export default app;
