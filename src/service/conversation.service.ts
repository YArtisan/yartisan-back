import conversationSchema from "../models/conversation.model";
import { conversationDto } from "../dto/conversation.dto";

async function createConversation(
  userId: string,
  artisanId: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    const newConversation = new conversationSchema({
      user_id: userId,
      artisan_id: artisanId,
      created_at: new Date(),
      last_update: new Date(),
    });

    newConversation.save().then(resolve).catch(reject);
  });
}

async function getConversationByUsers(
  user_id: string,
  artisan_id: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    conversationSchema
      .findOne({
        user_id,
        artisan_id,
      })
      .then(resolve)
      .catch(reject);
  });
}

async function getAllConversationsByUser(
  id: string
): Promise<conversationDto[]> {
  return new Promise((resolve, reject) => {
    conversationSchema
      .find({
        $or: [{ user_id: id }, { artisan_id: id }],
      })

      .lean()
      .then((e) => {
        resolve(e as conversationDto[]);
      })
      .catch(reject);
  });
}

async function getAllMessagesByConversationId(req: conversationDto, res: any) {
  if (!req._id) return;

  const conv = await conversationSchema.find({ conversation_id: req._id });

  res.status(200).json({ status: true, data: conv });
}

async function removeConversation(req: conversationDto, res: any) {
  // TODO Remove conversation
  try {
    const conversations = await conversationSchema.find({
      user_id: req.user_id,
    });

    if (!conversations)
      return res
        .status(400)
        .json({ status: false, message: "Conversation not found" });

    res.status(200).json({ status: true, data: conversations });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
}

export default {
  createConversation,
  getConversationByUsers,
  getAllConversationByUser: getAllConversationsByUser,
  removeConversation,
  getAllMessagesByConversationId,
};
