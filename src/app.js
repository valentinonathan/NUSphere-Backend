import express from "express";
import db from "./db/index.js";
import cookieParser from "cookie-parser";

const app = express();
const developmentPort = 4000;

app.use(express.json());
app.use(cookieParser());

import { authRouter } from "./routes/auth.route.js";
app.use("/auth", authRouter);


app.get("/", async (req, res, next) => {
    try {
        let test = await db.query("SELECT * FROM test");
        test = test?.rows;
        res.status(200).send(test);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(developmentPort, () => {console.log(`NUSphere server listening on port ${developmentPort}`)});