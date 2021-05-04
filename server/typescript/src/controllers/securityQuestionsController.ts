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
        "email": req.body.email,
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
    console.log(req.body);
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

    const queryStatement: string = "SELECT * FROM securityQuestions WHERE email = ?";
 
    db.query(queryStatement, req.body.email, (queryError: MysqlError | null, queryResults: any) => {
        if (queryError) {
            SecurityQuestionsGetResponse.error = {
                "message": queryError.sqlMessage
            };
        } else {
            SecurityQuestionsGetResponse.results = [
                {
                    "email": queryResults[0].email,
                    "securityQuestionsId": queryResults[0].securityQuestionsId,
                    "securityQuestions": JSON.parse(queryResults[0].securityQuestions)
                }
            ]
        }
        res.json(SecurityQuestionsGetResponse);
    });
});

export default router;
