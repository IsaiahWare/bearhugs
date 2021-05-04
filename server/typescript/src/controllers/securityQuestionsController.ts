import bcrypt from "bcrypt";
import db from "../db";
import express, { Response , Request } from "express";
import { MysqlError } from "mysql";
import {
    SecurityQuestionsSendRequest,
    SecurityQuestionsGetRequest,
} from "../models/securityQuestionsControllerModels";
import {
    isSecurityQuestionsSendRequest,
    isSecurityQuestionsGetRequest
} from "../checkers/securityQuestionsControllerModelsChecker";

const router = express.Router();

router.post("/send", (req: Request, res: Response) => {
    console.log(req.body);
    const SecurityQuestionsSend: any = {
        "error": {},
        "results": []
    };
    
    if (!isSecurityQuestionsSendRequest(req.body)) {
        SecurityQuestionsSend.error = {
            "message": "Invalid request parameters"
        };
        res.json(SecurityQuestionsSend);
        return;
    }

    const queryStatement: string = "INSERT INTO securityQuestions SET ?";
    
    const queryArgs = {
        "userId": req.body.userId,
        "securityQuestions": JSON.stringify(req.body.securityQuestions)
    };

    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any) => {
        if (queryError) {
            SecurityQuestionsSend.error = {
                "message": queryError.sqlMessage
            };
        } else {
            SecurityQuestionsSend.results = [
                {
                    "securityQuestionsId": queryResults.insertId,
                    "securityQuestions": req.body.securityQuestions
                }
            ];
        }   
        res.json(SecurityQuestionsSend);
    });
});  

router.post("/get", (req: Request, res: Response) => {
    const SecurityQuestionsGetResponse: any = {
        "error": {},
        "results": []
    };

    if (!isSecurityQuestionsGetRequest(req.body)) {
        SecurityQuestionsGetResponse.error = {
            "message": "Invalid request parameters"
        };
        res.json(isSecurityQuestionsGetRequest);
        return;
    }

    const queryStatement: string = "SELECT * FROM securityQuestions WHERE userId = ?";
 
    db.query(queryStatement, req.body, (queryError: MysqlError | null, queryResults: any) => {
        if (queryError) {
            SecurityQuestionsGetResponse.error = {
                "message": queryError.sqlMessage
            };
        } else {
            SecurityQuestionsGetResponse.results = [
                {
                    "userId": queryResults[0].userId,
                    "securityQuestionsId": queryResults[0].securityQuestionsId,
                    "securityQuestions": JSON.parse(queryResults[0].securityQuestions)
                }
            ]
        }
        res.json(SecurityQuestionsGetResponse);
    });
});

export default router;
