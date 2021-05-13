import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import userController from "./controllers/userController";
import quizController from "./controllers/securityQuestionsController";
import friendController from "./controllers/friendController";
import matchController from "./controllers/matchController";
import wingmanController from "./controllers/wingmanController";
import notificationController from "./controllers/notificationController"
import securityQuestionsController from "./controllers/securityQuestionsController"

const app = express()
const emailController = require('./email-confirmation/email/email.controller')
const { PORT, CLIENT_ORIGIN, DB_URL } = require('./config')

const mongoose = require('mongoose')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.json())

app.get("/", (req: express.Request , res: express.Response) => {
    res.send("Welcome to the bearhugs.love internal API!");
});

// This endpoint is pinged every 5 mins by uptimerobot.com to prevent 
// free services like Heroku and Now.sh from letting the app go to sleep.
// This endpoint is also pinged every time the client starts in the 
// componentDidMount of App.js. Once the app is confirmed to be up, we allow 
// the user to perform actions on the client.
app.get('/wake-up', (req, res) => res.json('👌'))
// This is the endpoint that is hit from the onSubmit handler in Landing.js
// The callback is shelled off to a controller file to keep this file light.
app.post('/email', emailController.collectEmail)
// Same as above, but this is the endpoint pinged in the componentDidMount of 
// Confirm.js on the client.
app.get('/email/confirm/:id', emailController.confirmEmail)

app.use("/notifications", notificationController)
app.use("/user", userController);
app.use("/quiz", quizController);
app.use("/friend", friendController);
app.use("/match", matchController);
app.use("/wingman", wingmanController);
app.use("/securityQuestions", securityQuestionsController);

// Catch all to handle all other requests that come into the app. 
app.use('*', (req, res) => {
    res.status(404).json({ msg: 'Not Found' })
  })
  


export default app;
