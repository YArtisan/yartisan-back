interface conversationDto {
  _id?: string;
  user_id?: string;
  artisan_id?: string;
}

interface messageDto {
  _id?: string;
  conversation_id?: string;
  expediteur_id?: string;
  message?: string;
}

export { conversationDto, messageDto };
