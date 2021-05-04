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
    
    // if (!isSecurityQuestionsSendRequest(req.body)) {
    // //     SecurityQuestionsSend.error = {
    //         "message": "Invalid request parameters"
    //     };
    //     res.json(SecurityQuestionsSend);
    //     return;
    // }

    const queryStatement: string = "INSERT INTO securityQuestions SET ?";
    
    const queryArgs: any = {
        "email": req.body.email,
        "a1": req.body.a1,
        "a2": req.body.a2,
        "q1": req.body.q1,
        "q2": req.body.q2
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

    // if (!isSecurityQuestionsGetRequest(req.body)) {
    //     SecurityQuestionsGetResponse.error = {
    //         "message": "Invalid request parameters"
    //     };
    //     res.json(isSecurityQuestionsGetRequest);
    //     return;
    // }

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
                    "securityQuestionsId": queryResults[0].id,
                    "q1": queryResults[0].q1,
                    "q2": queryResults[0].q2,
                    "a1": queryResults[0].a1,
                    "a2": queryResults[0].a2
                }
            ]
        }
        res.json(SecurityQuestionsGetResponse);
    });
});

export default router;
