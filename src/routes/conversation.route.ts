import express from "express";
import conversationController from "../controller/conversation.controller.js";

export default function (app: any) {
  app.post("/chat", (req: any, res: any) => {
    conversationController.createConversation(req, res);
  });

  app.get("/chat/user/:userId", (req: any, res: any) => {
    conversationController.getAllConversation(req, res);
  });
}
