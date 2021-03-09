import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mysql from "mysql";

import userController from "./controllers/userController";
import quizController from "./controllers/quizController";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get("/", (req: express.Request , res: express.Response) => {
    res.send("Welcome to the bearhugs.love internal API!");
});

app.use("/user", userController);
app.use("/quiz", quizController);

export default app;
