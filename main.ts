import express from "express";
import { connect } from "mongoose";
import userRoute from "./src/routes/users.route.js";
import ratingRoute from "./src/routes/rating.route.js";
import artisantRoute from "./src/routes/artisant.route.js";
import authenticationRoute from "./src/routes/oauth.route.js";
import { config } from "dotenv";
import { authMiddleware } from "./src/middleware/middleware.js";
import admin from "firebase-admin";
import serviceAccount from "./service-account.json" assert { type: "json" };
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import ConversationController from "./src/controller/conversation.controller.js";

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const auth = admin.auth();

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
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
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

// app.use((req) => {
//   const strRequest = `${req.method} ${
//     req.originalUrl
//   } (${new Date().toISOString()})`;
//   console.log(strRequest);
// });

app.use(authMiddleware);

export const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
  },
});

io.on("connection", (socket) => {
  ConversationController(io, socket);
});

authenticationRoute(app);
userRoute(app);
ratingRoute(app);
artisantRoute(app);

// Start the server
server.listen(3000, () => console.log("Server started on port 3000"));

// Export the Express API
export default app;
