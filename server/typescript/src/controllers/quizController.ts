import bcrypt from "bcrypt";
import db from "./../db";
import express, { Response , Request } from "express";
import { MysqlError } from "mysql";
import {
    SendQuizResultsRequest,
    SendQuizResultsResponse,
    FindQuizResultsResponse,
    FindQuizResultsRequest
} from "./../models/quizControllerModels";
import {
    isSendQuizResultsRequest,
    isFindQuizResultsRequest,
} from "./../checkers/quizControllerModelsChecker";

const router = express.Router();

router.post("/create", (req: Request, res: Response) => {
    console.log(req.body);
    const sendQuizResultsResponse: SendQuizResultsResponse = {
        "error": {},
        "results": []
    };
    
    if (!isSendQuizResultsRequest(req.body)) {
        sendQuizResultsResponse.error = {
            "message": "Invalid request parameters"
        };
        res.json(sendQuizResultsResponse);
        return;
    }

    const queryStatement: string = "INSERT INTO quizzes SET ?";
    
    const queryArgs = {
        "userId": req.body.userId,
        "quizResults": JSON.stringify(req.body.quizResults)
    };

    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any) => {
        if (queryError) {
            sendQuizResultsResponse.error = {
                "message": queryError.sqlMessage
            };
        } else {
            sendQuizResultsResponse.results = [
                {
                    "quizId": queryResults.insertId,
                    "quizResults": req.body.quizResults
                }
            ];
        }   
        res.json(sendQuizResultsResponse);
    });
});  

router.post("/find", (req: Request, res: Response) => {
    console.log(req.body)
    const findQuizResultsResponse: FindQuizResultsResponse = {
        "error": {},
        "results": []
    };

    if (!isFindQuizResultsRequest(req.body)) {
        findQuizResultsResponse.error = {
            "message": "Invalid request parameters"
        };
        res.json(findQuizResultsResponse);
        return;
    }

    const queryStatement: string = "SELECT * FROM quizzes WHERE userId = ?";
 
    db.query(queryStatement, req.body, (queryError: MysqlError | null, queryResults: any) => {
        console.log("qwe", queryResults);
        if (queryError) {
            findQuizResultsResponse.error = {
                "message": queryError.sqlMessage
            };
        } else {
            findQuizResultsResponse.results = [
                {
                    "userId": queryResults[0].userId,
                    "quizId": queryResults[0].quizId,
                    "quizResults": JSON.parse(queryResults[0].quizResults)
                }
            ]
        }
        res.json(findQuizResultsResponse);
    });
});  

export default router;

