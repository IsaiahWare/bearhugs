import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mysql from "mysql";

import userController from "./controllers/userController";

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

export default app;
