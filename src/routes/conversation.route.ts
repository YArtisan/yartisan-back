import express from "express";
import conversationController from "../controller/conversation.controller";

export default function (app: any) {
    const jsonMiddleware = express.json();

    app.post("/chat", jsonMiddleware, (req: any, res: any) => {
        conversationController.createConvesration(req, res);
    });

    app.get("/chat/getall", jsonMiddleware, (req: any, res: any) => {
        conversationController.getAllConversation(req, res);
    });
}