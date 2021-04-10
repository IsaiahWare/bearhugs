import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import userController from "./controllers/userController";
import quizController from "./controllers/quizController";
import friendController from "./controllers/friendController";
import matchController from "./controllers/matchController";
import wingmanController from "./controllers/wingmanController";

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
app.use("/friend", friendController);
app.use("/match", matchController);
app.use("/wingman", wingmanController);

export default app;
