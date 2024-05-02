interface messageDto {
  _id: string;
  conversation_id: Number;
  expediteur_id: Number;
  message: String;
  created_at: Date;
  last_update: Date;
  url?: string;
}

export { messageDto };
