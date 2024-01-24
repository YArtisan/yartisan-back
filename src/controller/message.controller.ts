import messageService from "../service/message.service"

function createMessage (req: any, res: any) {
    messageService.createMessage(req.body, res);
}

function getAllMessages (req: any, res: any) {
    messageService.getAllMessages(req.body, res);
}

function removeMessage (req: any, res: any) {
    messageService.removeMessage(req.body, res);
}

export default { createMessage, getAllMessages, removeMessage }