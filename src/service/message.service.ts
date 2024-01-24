import messageSchema from "../models/message.model";
import { messageDto } from "../dto/message.dto";

async function createMessage (req: messageDto, res: any) {
    const expediteur_id = await messageSchema.findOne({
        expediteur_id : req.expediteur_id
    });

    if (!expediteur_id) return res.status(400).json({message: "Pas d'expediteur"});

    const newMessage = new messageSchema({
        conversation_id : req.conversation_id,
        expediteur_id: req.expediteur_id,
        message: req.message,
        createdAt: Date.now(),
        last_update: Date.now()
    });

    newMessage.save();
    res.status(200).json({ status: true, message: "Message send successfully" });
}

async function getAllMessages (req: messageDto, res: any) {
    const conversation_id = await messageSchema.findOne({
        conversation_id : req.conversation_id
    });

    if (!conversation_id) return res.status(400).json({message: "Pas d'expediteur"});

    try {
        const conversation = await messageSchema.find({conversation_id: req.conversation_id});
        if (!conversation) return res.status(400).json({status: false, message: "Conversation not found"});

        res.status(200).json({ status: true, data: conversation });

    } catch (error : any) {
        res.status(400).json({ status: true, message: "Conversation not found" });
    }
}

async function getLastMessage (conversation_id: number) {
    
    if(!conversation_id) return '';

    const last_message = await messageSchema.findOne({conversation_id: conversation_id});

    return last_message;
}

async function removeMessage (req: messageDto, res: any) {
    const message_id = await messageSchema.findOne({
        id : req.id
    });

    if (!message_id) return res.status(400).send({message: "Message not found"});

    // TODO Remove message
}

export default { createMessage, getAllMessages, removeMessage, getLastMessage }