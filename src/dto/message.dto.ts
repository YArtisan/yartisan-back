interface messageDto {
    id : Number,
    conversation_id : Number,
    expediteur_id : Number,
    message : String,
    created_at : Date,
    last_update : Date
}

export { messageDto }