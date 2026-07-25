import express from "express";
import { authenticateRequest } from "../middleware/auth.middleware.js";
import { upload, createListingValidator } from "../middleware/market.middleware.js";
import { getProductCardController, createListingController, getListingController, getCategoriesController, getMyListingsController } from "../controllers/market.controller.js";
// import { reserveListingController, getListingReservationController } from "../controllers/reservation.controller.js";

const marketRouter = express.Router();

marketRouter.get("/", authenticateRequest, getProductCardController)
marketRouter.post("/", authenticateRequest, upload.single("image"), createListingValidator, createListingController)
marketRouter.get("/categories", authenticateRequest, getCategoriesController)
marketRouter.get("/my-listings", authenticateRequest, getMyListingsController)
// marketRouter.post("/:listingId/reserve", authenticateRequest, reserveListingController)
// marketRouter.get("/:listingId/reservation", authenticateRequest, getListingReservationController)
marketRouter.get("/:id", authenticateRequest, getListingController)


export {marketRouter}