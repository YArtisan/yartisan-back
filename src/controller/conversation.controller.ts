import conversationService from "../service/conversation.service"

function createConvesration (req: any, res: any) {
    conversationService.createConvesration(req.body, res);
}

function getAllConversation (req: any, res: any) {
    conversationService.getAllConversation(req.body, res);
}

function removeConversation (req: any, res: any) {
    conversationService.removeConversation(req.body, res);
}

export default { createConvesration, getAllConversation, removeConversation }
