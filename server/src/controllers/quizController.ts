import bcrypt from "bcrypt";
import db from "./../db";
import express, { Response , Request } from "express";
import { MysqlError } from "mysql";

const router = express.Router();

interface SendQuizResultsRequest {
    id: number;
    quizResults: string;
}

interface SendQuizResultsResponse {
    error: MysqlError | null;
    results: boolean;
}

interface FindQuizResultsRequest {
    id: number
}

interface FindQuizResultResponse {
    error: MysqlError | null;
    results: object[];
}

router.post("/send", (req: Request, res: Response) => {
    const queryStatement: string = "INSERT * FROM users WHERE id = ?";
    const queryArgs: SendQuizResultsRequest = {
        "id": req.body.id,
        "quizResults": req.body.quizResults
    };
 
    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any) => {
        const sendQuizResultsResponse: SendQuizResultsResponse = {
            "error": queryError,
            "results": queryError ? false : true 
        };
        res.json(sendQuizResultsResponse);
    });
});  

router.post("/find", (req: Request, res: Response) => {
    const queryStatement: string = "SELECT quizResults FROM users WHERE id = ?";
    const queryArgs: FindQuizResultsRequest = {
        "id": req.body.id
    };
 
    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any) => {
        const findSendQuizResultsResponse: SendQuizResultsResponse = {
            "error": queryError,
            "results": queryError ? [] : queryResults 
        };
        res.json(findSendQuizResultsResponse);
    });
});  

export default router;

