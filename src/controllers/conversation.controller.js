import { getOrCreateConversation } from "../services/conversation.service.js";
import { getUserIdByUsername } from "../utils/user.utils.js";


export async function getOrCreateConversationController(req, res) {
  try {
    const senderId = req.userId;
    const { receiverUsername, initialMessage } = req.body;

    if (!receiverUsername || typeof receiverUsername !== "string") {
      return res.status(400).json({
        message: "receiverUsername is required",
      });
    }

    const receiver = await getUserIdByUsername(receiverUsername.trim());

    if (receiver == "") {
      return res.status(404).json({
        message: "Receiver does not exist",
      });
    }

    if (String(receiver) === String(senderId)) {
      return res.status(400).json({
        message: "You cannot start a conversation with yourself",
      });
    }

    const result = await getOrCreateConversation(senderId, receiver);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// export async function getConversationsController(req, res) {
//   try {
//     const conversations = await getConversationsByUserId(req.userId);
//     return res.status(200).json({ conversations });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }

// export async function getConversationMessagesController(req, res) {
//   try {
//     const conversationId = Number(req.params.conversationId);

//     if (Number.isNaN(conversationId)) {
//       return res.status(400).json({ message: "Invalid conversationId" });
//     }

//     const messages = await getMessagesByConversation(req.userId, conversationId);
//     return res.status(200).json({ messages });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }