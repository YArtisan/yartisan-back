import messageService from "../service/message.service";

async function createMessage(req: any, res: any) {
  try {
    const { conversation_id, expediteur_id, message } = req.body;
    await messageService.createMessage(conversation_id, expediteur_id, message);

    res
      .status(200)
      .json({ status: true, message: "Message send successfully" });
  } catch (error) {
    res.status(500).json({ status: false, error });
  }
}

async function getAllMessages(req: any, res: any) {
  try {
    const messages = await messageService.getMessagesInConversation(
      req.params.conversation_id
    );
    res.status(200).send({ status: true, messages });
  } catch (error) {
    res.status(500).json({ status: false, error });
  }
}

function removeMessage(req: any, res: any) {
  messageService.removeMessage(req.body, res);
}

export default { createMessage, getAllMessages, removeMessage };
