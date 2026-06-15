import express from "express";
import db from "./db/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const developmentPort = 4000;

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:3000",
    "https://nusphere-seven.vercel.app",
    "https://nusphere-valentino-nathan-s-projects.vercel.app",
    "https://nusphere-kur5463in-valentino-nathan-s-projects.vercel.app",
    "https://nusphere-obl2wj89y-valentino-nathan-s-projects.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

import { authRouter } from "./routes/auth.route.js";
app.use("/auth", authRouter);

import { authenticateRequest } from "./middleware/auth.middleware.js";
app.get("/", async (req, res, next) => {
    try {
        let test = await db.query("SELECT * FROM test");
        test = test?.rows;
        res.status(200).json({message: test});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(developmentPort, () => {console.log(`NUSphere server listening on port ${developmentPort}`)});