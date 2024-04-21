import "dotenv/config.js";
import express from "express";
import { connect } from "mongoose";
import userRoute from "../src/routes/users.route.js";
import ratingRoute from "../src/routes/rating.route.js";
import artisantRoute from "../src/routes/artisant.route.js";
import authenticationRoute from "../src/routes/oauth.route.js";
import stripeRoute from "../src/routes/stripe.route.js";
import { authMiddleware } from "../src/middleware/authMiddleware.js";
import { showRequest } from "../src/middleware/showRequestMiddleware.js";
import admin from "firebase-admin";
import cors from "cors";
import { Server } from "socket.io";
import Stripe from 'stripe'
import http from "http";
import ChatHandler from "../src/socket/chat-handler.js";
import conversationRoute from "../src/routes/conversation.route.js";

const app = express();

const adminCred =
{
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.FIREBASE_CERT_URL,
  "universe_domain": "googleapis.com"
}


admin.initializeApp({
  credential: admin.credential.cert(adminCred as admin.ServiceAccount),
});

export const auth = admin.auth();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const origin = process.env.ORIGIN?.includes(",")
  ? process.env.ORIGIN.split(",")
  : process.env.ORIGIN;

app.use(
  cors({
    origin,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

const mongo_uri = process.env.MONGODB_URI;

if (!mongo_uri) {
  throw new Error("La variable d'environnement MONGODB_URI n'est pas définie.");
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
