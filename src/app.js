import express from "express";
const app = express();
const developmentPort = 4000;

app.use(express.json());

app.get("/", (req, res, next) => {
    res.status(200).send("Welcome to NUSphere Server");
})

app.listen(developmentPort, () => {console.log(`NUSphere server listening on port ${developmentPort}`)});