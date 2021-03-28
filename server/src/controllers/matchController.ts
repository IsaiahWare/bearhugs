import bcrypt from "bcrypt";
import db from "./../db";
import express, { Response , Request } from "express";
import { MysqlError } from "mysql";
import {
} from "./../models/userControllerModels";
import {
} from "./../checkers/userControllerModelsChecker";

const saltRounds: number = 10;
const router = express.Router();

router.post("/match", (req: Request, res: Response) => {    
    const matchResponse: any = {
        "error": {},
        "results": []
    };

    const queryStatement: string = "SELECT requester FROM matchRequests WHERE requestee = ? AND requester = ?";
    const queryArgs = [req.body.requester, req.body.requestee];
    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            matchResponse.error =  {
                "message": queryError.sqlMessage
            };
        } 
        else {
            if (queryResults.length === 1) {
                const queryStatement2 = "INSERT INTO completeMatches SET ?";
                const queryArgs2 = {
                    "userId1": req.body.requester,
                    "userId2": req.body.requestee
                };
                db.query(queryStatement2, queryArgs2, (queryError2: MysqlError | null, queryResults2: any ) => {
                    if (queryError2) {
                        matchResponse.error =  {
                            "message": queryError2.sqlMessage
                        };
                    } else {
                        matchResponse.results = [
                            {
                                "matched": true
                            }
                        ];
                    }
                });
            } 
            else {
                matchResponse.results = [
                    {
                        "matched": false
                    }
                ];
            }
        }
        res.json(matchResponse);
    }); 
});

export default router;

