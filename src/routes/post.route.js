import express from "express";
const postRouter = express();

import { authenticateRequest } from "../middleware/auth.middleware.js";
import { getPostsController, getPostByIdController, likePostByIdController, hasLikedController, createPostController } from "../controllers/post.controller.js";
import { likePostValidator, createPostValidator, upload } from "../middleware/post.middleware.js";
postRouter.post("/", authenticateRequest, upload.single("image"), createPostValidator, createPostController);
postRouter.get("/username/:username", authenticateRequest, getPostsController);
postRouter.get("/id/:userId", authenticateRequest, getPostsController);
postRouter.get("/:postId", authenticateRequest, getPostByIdController);
postRouter.post("/:postId/likes", authenticateRequest, likePostValidator, likePostByIdController);
postRouter.get("/:postId/likes", authenticateRequest, hasLikedController);

export { postRouter }
// {
//   "url": "https://example.com/image.jpg",
//   "caption": "This is an optional caption"
// }

// {
//   "message": "Post created successfully",
//   "postId": 123,
//   "post": {
//     "id": 123,
//     "user_id": 456,
//     "url": "https://example.com/image.jpg",
//     "caption": "This is an optional caption",
//     "created_at": "2026-06-20T10:30:45.123Z"
//   }
// }
