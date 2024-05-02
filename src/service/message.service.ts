import messageSchema from "../models/message.model.js";
import { messageDto } from "../dto/message.dto.js";

async function createMessage(data: Partial<messageDto>) {
  return new Promise<any>((resolve, reject) => {
    const newMessage = new messageSchema({
      ...data,
    });

    newMessage.save().then(resolve).catch(reject);
  });
}

async function getMessagesInConversation(conversation_id: string) {
  return new Promise<messageDto[]>((resolve, reject) => {
    messageSchema
      .find({
        conversation_id,
      })
      .then((e) => resolve(e as any[]))
      .catch(reject);
  });
}

async function getLastMessage(conversation_id: string) {
  if (!conversation_id) return "";

  const last_message = await messageSchema.findOne({
    conversation_id,
  });

  return last_message;
}

async function removeMessage(req: messageDto, res: any) {
  const message_id = await messageSchema.findOne({
    id: req._id,
  });

  if (!message_id)
    return res.status(400).send({ message: "Message not found" });

  // TODO Remove message
}

export default {
  createMessage,
  getMessagesInConversation,
  removeMessage,
  getLastMessage,
};
