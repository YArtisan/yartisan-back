import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import messageService from "../service/message.service.js";

const messages: Record<string, any[]> = {};

const ChatHandler = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  const onConversationJoin = async (conversationId: string) => {
    socket.join(conversationId);
    console.log("join", conversationId);
    console.log(socket.rooms);

    const messages = await messageService.getMessagesInConversation(
      conversationId
    );
    socket.emit("conversation:joined", messages);
  };

  const onMessageSend = async (messageData: any) => {
    console.log("message send");

    const { conversation_id, expediteur_id, message } = messageData;
    console.log(conversation_id);
    console.log(socket.rooms);
    console.log(io.sockets.adapter.rooms);

    if (!io.sockets.adapter.rooms.get(conversation_id)) {
      return socket.emit("message:no-conversation-joined");
    }

    console.log("pass");

    messageService
      .createMessage(conversation_id, expediteur_id, message)
      .then((data) => {
        delete data._v;
        io.in(conversation_id).emit("message:added", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  socket.on("conversation:join", onConversationJoin);
  socket.on("message:send", onMessageSend);
};

export default ChatHandler;
