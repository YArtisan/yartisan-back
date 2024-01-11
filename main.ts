import express from "express";
import { connect } from "mongoose";
import userRoute from "./src/routes/users.route.js";
import ratingRoute from "./src/routes/rating.route.js";
import artisantRoute from "./src/routes/artisant.route.js";
import { config } from "dotenv";

const app = express();
config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Connect to mongoDb
connect(mongo_uri, {
	maxPoolSize: 10,
})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Failed to connect to MongoDB", err));

// Start the server
app.listen(3000, () => console.log("Server started on port 3000"));

userRoute(app);
ratingRoute(app);
artisantRoute(app);

// Export the Express API
export default app;
