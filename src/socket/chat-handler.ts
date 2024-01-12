import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const messages: Record<string, any[]> = {};

const ChatHandler = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  const onConversationJoin = (conversationId: string) => {
    socket.join(conversationId);
    // TODO FETCH MESSAGES
    socket.emit("conversation:joined", messages[conversationId] ?? []);
  };

  const onMessageSend = (message: any) => {
    const { conversationId } = message;
    if (!socket.rooms.has(conversationId)) {
      return socket.emit("message:no-conversation-joined");
    }

    const newMessage = {
      ...message,
      created_at: new Date(),
      expediteur_id: socket.id,
    };

    // TODO : Replace push & Save message in BDD
    if (!messages[conversationId]) messages[conversationId] = [];
    messages[conversationId].push(newMessage);

    io.in(conversationId).emit("message:added", newMessage);
  };

  socket.on("conversation:join", onConversationJoin);
  socket.on("message:send", onMessageSend);
};

export default ChatHandler;
