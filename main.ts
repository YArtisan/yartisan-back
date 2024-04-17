import express from "express";
import { connect } from "mongoose";
import userRoute from "./src/routes/users.route.js";
import ratingRoute from "./src/routes/rating.route.js";
import artisantRoute from "./src/routes/artisant.route.js";
import authenticationRoute from "./src/routes/oauth.route.js";
import stripeRoute from "./src/routes/stripe.route.js";
import { config } from "dotenv";
import { authMiddleware } from "./src/middleware/authMiddleware.js";
import { showRequest } from "./src/middleware/showRequestMiddleware.js";
import admin from "firebase-admin";
import serviceAccount from "./service-account.json" assert { type: "json" };
import cors from "cors";
import { Server } from "socket.io";
import Stripe from 'stripe'
import http from "http";
import ChatHandler from "./src/socket/chat-handler.js";
import conversationRoute from "./src/routes/conversation.route.js";

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const auth = admin.auth();

config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const origin = process.env.ORIGIN?.includes(",")
  ? process.env.ORIGIN.split(",")
  : process.env.ORIGIN;

app.use(
  cors({
    origin,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

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

app.use(showRequest);
app.use(authMiddleware);

const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: "2023-10-16",
});

export const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin,
  },
});

io.on("connection", (socket) => {
  ChatHandler(io, socket);
});

ratingRoute(app);
artisantRoute(app);
conversationRoute(app);
authenticationRoute(app);
userRoute(app, stripe);
stripeRoute(app, stripe)

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => console.log("Server started on port " + port));

// Export the Express API
export default app;
