import { Request, Response } from "express";
import conversationService from "../service/conversation.service";
import messageModel from "../models/message.model";
import messageService from "../service/message.service";
import artisantService from "../service/artisant.service";
import userService from "../service/user.service";

async function createConversation(req: Request, res: Response) {
  try {
    const { user_id, artisan_id } = req.body;

    const conversation = await conversationService.getConversationByUsers(
      user_id,
      artisan_id
    );

    if (!!conversation)
      return res
        .status(400)
        .json({ status: false, message: "Conversation already exists." });

    const data = await conversationService.createConversation(
      user_id,
      artisan_id
    );

    res.status(200).json({
      status: true,
      message: "Conversation created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ status: true, error });
  }
}

async function getAllConversations(req: any, res: any) {
  try {
    const conversations = await conversationService.getAllConversationByUser(
      req.params.userId
    );

    const completeConversations = [];
    for (const c of conversations) {
      const lastMessage = await messageService.getLastMessage(c._id);
      const artisan = await artisantService.getArtisantDataService(
        c.artisan_id
      );
      const user = await userService.getUserDataService(c.user_id);

      completeConversations.push({ ...c, lastMessage, artisan, user });
    }

    res.status(200).json({
      status: true,
      conversations: completeConversations,
    });
  } catch (error) {
    res.status(500).json({ status: true, error });
  }
}

function removeConversation(req: any, res: any) {
  conversationService.removeConversation(req.body, res);
}

export default {
  createConversation,
  getAllConversation: getAllConversations,
  removeConversation,
};
