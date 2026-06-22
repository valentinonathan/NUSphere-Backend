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
    "https://nusphere-obl2wj89y-valentino-nathan-s-projects.vercel.app",
    "https://nusphere-git-feature-post-valentino-nathan-s-projects.vercel.app",
    "https://nusphere-8zy1cgm17-valentino-nathan-s-projects.vercel.app"
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
import { eventRouter } from "./routes/event.route.js";
import { userRouter } from "./routes/user.route.js";
import { postRouter } from "./routes/post.route.js";
import { commentRouter } from "./routes/comment.route.js";
import { friendRequestsRouter } from "./routes/friendRequests.route.js";
import { eventAttendanceRouter } from "./routes/event.attendance.route.js";

app.use("/auth", authRouter);
app.use("/events", eventRouter);
app.use("/events", eventAttendanceRouter)
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/friend-requests", friendRequestsRouter);

import { authenticateRequest } from "./middleware/auth.middleware.js";
import { getUserDetailsByUserId } from "./services/user.service.js";
app.get("/", authenticateRequest, async (req, res, next) => {
    try {
        let test = await db.query("SELECT * FROM test");
        test = test?.rows?.[0]?.name;
        let username = await getUserDetailsByUserId(req.userId);
        username = username.username;
        res.status(200).json({message: test + " " + req.userId, loggedIn: true, username: username, userId: req.userId});
    } catch (error) {
        if (error.message == "UserId not found") {
            res.status(404).json(error.message);
        } else {
            res.status(500).send(error.message);
        }
    }
});

app.listen(developmentPort, () => {console.log(`NUSphere server listening on port ${developmentPort}`)});