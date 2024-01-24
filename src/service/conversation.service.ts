import conversationSchema from "../models/conversation.model";
import { conversationDto } from "../dto/conversation.dto";
import messageService from "../service/message.service"
import { messageDto } from "../dto/message.dto";

async function createConvesration (req: conversationDto, res: any): Promise<void> {

    const user_id = await conversationSchema.findOne({
        user_id: req.user_id,
    });

    const artisan_id = await conversationSchema.findOne({
        artisant_id: req.artisant_id,
    });

    if (user_id && artisan_id) {
        // TODO Retrun conversation already created
      } else {
        const newConversation = new conversationSchema({
            user_id : req.user_id,
            artisant_id : req.artisant_id,
            created_at : req.created_at,
            last_update : req.last_update
        });

        newConversation.save();
        res.status(200).json({ status: true, message: "Conversation created successfully" });
    }
}

async function getAllConversation (req: conversationDto, res: any): Promise<void> {
    try {
        let conversations = await conversationSchema.find({user_id: req.user_id});
        
        if (!conversations) return res.status(400).json({status: false, message: "Conversation not found"});
        
        let conv_array: any = [];
        let data: any = [];

        conversations.forEach(async conversation => {
            const message = await messageService.getLastMessage(conversation.id);
            if (message) {
                data = [{
                    conversation: conversation,
                    message: message
                }]
            }
            conv_array.push(data);
        });

        res.status(200).json({ status: true, data: conv_array});

    } catch (error: any) {
        res.status(500).json({ status: false, message: error.message });
    }
}

async function getAllMessagesByConversationId (req: conversationDto, res: any) {

    if (!req.id) return;

    const conv = await conversationSchema.find({conversation_id: req.id});

    res.status(200).json({status: true, data: conv});
}

async function removeConversation (req: conversationDto, res: any) {

    // TODO Remove conversation
    try {
        const concersations = await conversationSchema.find({user_id: req.user_id});
        
        if (!concersations) return res.status(400).json({status: false, message: "Conversation not found"});

        res.status(200).json({ status: true, data: concersations});
    } catch (error: any) {
        res.status(500).json({ status: false, message: error.message });
    }
}

export default { createConvesration, getAllConversation, removeConversation, getAllMessagesByConversationId }