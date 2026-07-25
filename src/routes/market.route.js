import express from "express";
import { authenticateRequest } from "../middleware/auth.middleware.js";
import { upload, createListingValidator } from "../middleware/market.middleware.js";
import { getProductCardController, createListingController, getListingController, getCategoriesController } from "../controllers/market.controller.js";

const marketRouter = express.Router();

marketRouter.get("/", authenticateRequest, getProductCardController)
marketRouter.get("/categories", authenticateRequest, getCategoriesController)
marketRouter.post("/", authenticateRequest, upload.single("image"), createListingValidator, createListingController)
marketRouter.get("/:id", authenticateRequest, getListingController)

export {marketRouter}