import express from "express"
const moduleRouter = express();

import { authenticateRequest } from "../middleware/auth.middleware.js"
import { deleteAttendanceController, deleteReplyDownvoteController, deleteReplyUpvoteController, deleteThreadDownvoteController, deleteThreadUpvoteController, getAttendanceController, getFeedModuleController, getModuleThreadsController, getMyModuleController, getThreadRepliesController, postAttendanceController, postReplyDownvoteController, postReplyUpvoteController, postThreadDownvoteController, postThreadRepliesController, postThreadUpvoteController } from "../controllers/module.controller.js"
import { getModuleThreadsValidator, getThreadRepliesValidator, postAttendanceValidator, postReplyUpvoteValidator, postThreadRepliesValidator, threadVoteValidator } from "../middleware/module.middleware.js";

moduleRouter.get("/my", authenticateRequest, getMyModuleController);
moduleRouter.get("/feed", authenticateRequest, getFeedModuleController);

moduleRouter.get("/:moduleCode/threads", authenticateRequest, getModuleThreadsValidator, getModuleThreadsController);
moduleRouter.post("/:moduleCode/threads/:threadId/replies", authenticateRequest, postThreadRepliesValidator, postThreadRepliesController);
moduleRouter.get("/:moduleCode/threads/:threadId/replies", authenticateRequest, getThreadRepliesValidator, getThreadRepliesController);

moduleRouter.post("/:moduleCode/threads/:threadId/upvote", authenticateRequest, threadVoteValidator, postThreadUpvoteController);
moduleRouter.post("/:moduleCode/threads/:threadId/downvote", authenticateRequest, threadVoteValidator, postThreadDownvoteController);
moduleRouter.delete("/:moduleCode/threads/:threadId/upvote", authenticateRequest, threadVoteValidator, deleteThreadUpvoteController);
moduleRouter.delete("/:moduleCode/threads/:threadId/downvote", authenticateRequest, threadVoteValidator, deleteThreadDownvoteController);

moduleRouter.post("/:moduleCode/threads/:threadId/replies/:replyId/upvote", authenticateRequest, postReplyUpvoteValidator, postReplyUpvoteController);
moduleRouter.delete("/:moduleCode/threads/:threadId/replies/:replyId/upvote", authenticateRequest, postReplyUpvoteValidator, deleteReplyUpvoteController);
moduleRouter.post("/:moduleCode/threads/:threadId/replies/:replyId/downvote", authenticateRequest, postReplyUpvoteValidator, postReplyDownvoteController);
moduleRouter.delete("/:moduleCode/threads/:threadId/replies/:replyId/downvote", authenticateRequest, postReplyUpvoteValidator, deleteReplyDownvoteController);

moduleRouter.post("/:moduleCode/attendance", authenticateRequest, postAttendanceValidator, postAttendanceController);
moduleRouter.get("/:moduleCode/attendance", authenticateRequest, postAttendanceValidator, getAttendanceController);
moduleRouter.delete("/:moduleCode/attendance", authenticateRequest, postAttendanceValidator, deleteAttendanceController);

export { moduleRouter }