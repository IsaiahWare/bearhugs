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

router.post("/request", (req: Request, res: Response) => {    
    const matchResponse: any = {
        "error": {},
        "results": []
    };

    const queryStatement: string = "SELECT requesterId FROM pendingMatches WHERE requesteeId = ? AND requesterId = ?";
    const queryArgs = [req.body.requesterId, req.body.requesteeId];
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
                    "requesterId": req.body.requesterId,
                    "requesteeId": req.body.requesteeId
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

