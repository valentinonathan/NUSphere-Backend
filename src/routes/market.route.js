import express from "express";
import { authenticateRequest } from "../middleware/auth.middleware.js";
import { upload, createListingValidator } from "../middleware/market.middleware.js";
import { getProductCardController, createListingController } from "../controllers/market.controller.js";

const marketRouter = express.Router();

marketRouter.get("/", authenticateRequest, getProductCardController)
marketRouter.post("/", authenticateRequest, upload.single("image"), createListingValidator, createListingController)

export {marketRouter}