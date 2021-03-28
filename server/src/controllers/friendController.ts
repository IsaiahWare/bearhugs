import bcrypt from "bcrypt";
import db from "./../db";
import express, { Response , Request } from "express";
import { MysqlError } from "mysql";
import {
} from "./../models/userControllerModels";
import {
} from "./../checkers/userControllerModelsChecker";

const router = express.Router();

router.post("/send", (req: Request, res: Response) => {    
    const matchResponse: any = {
        "error": {},
        "results": []
    };

    const queryStatement: string = "SELECT requesterId FROM pendingFriends WHERE requesteeId = ? AND requesterId = ?";
    const queryArgs = [req.body.requesterId, req.body.requesteeId];
    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            matchResponse.error =  {
                "message": queryError.sqlMessage
            };
            res.json(matchResponse);
        } 
        else {
            if (queryResults.length === 1) {
                const queryStatement2 = "DELETE FROM pendingFriends WHERE requesterId = ? AND requesteeID = ?";
                const queryArgs2 = [req.body.requesteeId, req.body.requesterId];
                db.query(queryStatement2, queryArgs2, (queryError2: MysqlError | null, queryResults2: any ) => {
                    if (queryError2) {
                        matchResponse.error =  {
                            "message": queryError2.sqlMessage
                        };
                    } else {
                        const queryStatement3 = "INSERT INTO completedFriends (userId1, userId2) VALUES (?,?), (?,?)";
                        const queryArgs3 = [req.body.requesterId, req.body.requesteeId, req.body.requesteeId, req.body.requesterId];
                        db.query(queryStatement3, queryArgs3, (queryError3: MysqlError | null, queryResults3: any ) => {
                            if (queryError3) {
                                matchResponse.error =  {
                                    "message": queryError3.sqlMessage
                                };
                            } else {
                                matchResponse.results = [
                                    {
                                        "matched": true
                                    }
                                ];
                            }
                            res.json(matchResponse);
                        });
                   }
                });
            } 
            else {
                const queryStatement2 = "INSERT INTO pendingFriends SET ?";
                const queryArgs2 = {
                    "requesterId": req.body.requesterId,
                    "requesteeId": req.body.requesteeId
                };
                db.query(queryStatement2, queryArgs2, (queryError2: MysqlError | null, queryResults2: any ) => {
                    console.log(queryResults2);
                    if (queryError2) {
                        matchResponse.error =  {
                            "message": queryError2.sqlMessage
                        };
                    } else {
                        matchResponse.results = [
                            {
                                "matched": false
                            }
                        ];
                    }
                    res.json(matchResponse);
                });
            }
        }
    }); 
});

router.post("/friends", (req: Request, res: Response) => {
    const matchResponse: any = {
        "error": {},
        "results": []
    };
    const queryStatement = "SELECT users.userId, users.email, users.firstName, users.lastName, users.age, users.description, users.genderIdentity, users.genderPreferences FROM users INNER JOIN completedFriends ON completedFriends.userId2 = users.userId WHERE completedFriends.userId1 = ?"; 
    db.query(queryStatement, req.body.userId, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            matchResponse.error =  {
                "message": queryError.sqlMessage
            };
        } else {
            matchResponse.results = queryResults
        }
        res.json(matchResponse);
    });
});

router.post("/requests", (req: Request, res: Response) => {
    const matchResponse: any = {
        "error": {},
        "results": []
    };
    const queryStatement = "SELECT users.userId, users.email, users.firstName, users.lastName, users.age, users.description, users.genderIdentity, users.genderPreferences FROM users INNER JOIN pendingFriends ON pendingFriends.requesterId = users.userId WHERE pendingFriends.requesteeId = ?"; 
    db.query(queryStatement, req.body.userId, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            matchResponse.error =  {
                "message": queryError.sqlMessage
            };
        } else {
            matchResponse.results = queryResults;
        }
        res.json(matchResponse);
    });
});

router.post("/unfriend", (req: Request, res: Response) => {
    const matchResponse: any = {
        "error": {},
        "results": []
    };
    const queryStatement = "DELETE FROM completedFriends WHERE (userId1 = ? AND userId2 = ?) OR (userId1 = ? AND userId2 = ?)";
    const queryArgs = [req.body.userId1, req.body.userId2, req.body.userId2, req.body.userId1];
    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            matchResponse.error =  {
                "message": queryError.sqlMessage
            };
        } else {
            matchResponse.results = [{
                "success": true
            }]
        }
        res.json(matchResponse);
    });
});

export default router;

