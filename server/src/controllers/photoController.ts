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

router.post("/upload", (req: Request, res: Response) => {
    console.log(req.body);
    const sendQuizResultsResponse: SendQuizResultsResponse = {
        "error": {},
        "results": []
    };
    

    const queryStatement: string = "INSERT INTO photos SET ?";
    
    const queryArgs = {
        "userId": req.body.userId,
        "photoUrl": req.body.photoUrl
    };

    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any) => {
        if (queryError) {
            sendQuizResultsResponse.error = {
                "message": queryError.sqlMessage
            };
        } else {
            sendQuizResultsResponse.results = [
                {
                    "success": true
                }
            ];
        }   
        res.json(sendQuizResultsResponse);
    });
});  

router.post("/all", (req: Request, res: Response) => {
    console.log(req.body)
    const findQuizResultsResponse: FindQuizResultsResponse = {
        "error": {},
        "results": []
    };

    const queryStatement: string = "SELECT photoUrl FROM photos WHERE userId = ?";
 
    db.query(queryStatement, req.body.userId, (queryError: MysqlError | null, queryResults: any) => {
        if (queryError) {
            findQuizResultsResponse.error = {
                "message": queryError.sqlMessage
            };
        } else {
            findQuizResultsResponse.results = queryResults
        }
        res.json(findQuizResultsResponse);
    });
});  

export default router;

