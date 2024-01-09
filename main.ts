import express from "express";
import { connect } from "mongoose";
import userRoute from "./src/routes/users.route.js";
import ratingRoute from "./src/routes/rating.route.js";
import artisantRoute from "./src/routes/artisant.route.js";
import { config } from "dotenv";
import { authMiddleware } from "./src/middleware/middleware.js";

const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

const app = express();
config();

// Ajouter des en-têtes CORS à toutes les requêtes
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

const mongo_uri = process.env.MONGODB_URL;

if (!mongo_uri) {
	throw new Error("La variable d'environnement MONGODB_URL n'est pas définie.");
}

admin.initializeApp({
	redential: admin.credential.cert(serviceAccount)
});

// Connect to mongoDb
connect(mongo_uri, {
	maxPoolSize: 10,
})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(authMiddleware);

// Start the server
app.listen(3000, () => console.log("Server started on port 3000"));

userRoute(app);
ratingRoute(app);
artisantRoute(app);

// Export the Express API
export default app;
