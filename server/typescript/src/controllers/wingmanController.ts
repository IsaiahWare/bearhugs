import db from "../db";
import express, { Response , Request } from "express";
import { MysqlError } from "mysql";
import { 
    isWingmanSendRequest,
    isWingmanRequestsRequest,
    isWingmanMatchesRequest,
    isWingmanUnmatchRequest,
    isWingmanRejectRequest,
    isWingmanRejectedMatchesRequest
} from "../checkers/wingmanControllerModelsChecker";

const router = express.Router();

router.post("/send", (req: Request, res: Response) => {    
    const wingmanResponse: any = {
        "error": {},
        "results": []
    };

    if(!isWingmanSendRequest) {
        wingmanResponse.error = {
            "message": "Invalid request parameters"
        };
        res.json(wingmanResponse);
        return;
    }

    const queryStatement: string = "SELECT * FROM pendingWingman WHERE wingmanId = ? AND requesteeId = ? AND requesterId = ?";
    const queryArgs = [req.body.wingmanId, req.body.requesteeId, req.body.requesterId];
    // db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any ) => {
        // if (queryError) {
        //     wingmanResponse.error =  {
        //         "message": queryError.sqlMessage
        //     };
        //     res.json(wingmanResponse);
        // } 
        // else {
            // if (queryResults.length !== 0) {
            //         wingmanResponse.error =  {
            //             "message": "Request already sent"
            //         };
            //     res.json(wingmanResponse);
            // } 
            // else {
                const queryStatement3: string = "SELECT requestId FROM pendingWingman WHERE wingmanId = ? AND requesteeId = ? AND requesterId = ?";
                const queryArgs3 = [req.body.wingmanId, req.body.requesterId, req.body.requesteeId];
                db.query(queryStatement3, queryArgs3, (queryError3: MysqlError | null, queryResults3: any ) => {
                    if (queryError3) {
                        wingmanResponse.error =  {
                            "message": queryError3.sqlMessage
                        };
                        res.json(wingmanResponse);
                    } else if (queryResults3.length !== 0) {
                        const queryStatement4: string = "INSERT INTO completedWingman (wingmanId, requesterId, requesteeId) VALUES (?,?,?), (?,?,?)";
                        const queryArgs4 = [
                               req.body.wingmanId,
                               req.body.requesterId, 
                               req.body.requesteeId,
                               req.body.wingmanId,
                               req.body.requesteeId, 
                               req.body.requesterId
                        ];
                        db.query(queryStatement4, queryArgs4, (queryError4: MysqlError | null, queryResults4: any ) => {
                            if (queryError4) {
                                wingmanResponse.error =  {
                                    "message": queryError4.sqlMessage
                                };
                                res.json(wingmanResponse);
                            } else {
                                const queryStatement6: string = "DELETE FROM pendingWingman WHERE requestId = ?";
                                const queryArgs6 = [queryResults3[0].requestId];
                                db.query(queryStatement6, queryArgs6, (queryError6: MysqlError | null, queryResults6: any ) => {
                                    if (queryError6) {
                                        wingmanResponse.error =  {
                                            "message": queryError6.sqlMessage
                                        };
                                    } else {
                                        wingmanResponse.results = [
                                            {
                                                "match": true
                                            }
                                        ];
                                    }
                                    res.json(wingmanResponse);
                                });
                            }
                        });
                    } else {
                        const queryStatement2 = "INSERT INTO pendingWingman SET ?";
                        const queryArgs2 = {
                            "wingmanId": req.body.wingmanId,
                            "requesterId": req.body.requesterId,
                            "requesteeId": req.body.requesteeId
                        };
                        db.query(queryStatement2, queryArgs2, (queryError2: MysqlError | null, queryResults2: any ) => {
                            if (queryError2) {
                                wingmanResponse.error =  {
                                    "message": queryError2.sqlMessage
                                };
                            } else {
                                wingmanResponse.results = [
                                    {
                                        "match": false
                                    }
                                ];
                            }
                            res.json(wingmanResponse);
                        });
                    }
                });
            // }
        // }
    // }); 
});

router.post("/requests", (req: Request, res: Response) => {
    const wingmanResponse: any = {
        "error": {},
        "results": []
    };

    if(!isWingmanRequestsRequest) {
        wingmanResponse.error = {
            "message": "Invalid request parameters"
        };
        res.json(wingmanResponse);
        return;
    }

    const queryStatement = "SELECT pendingWingman.requestId, pendingWingman.requesterId, pendingWingman.requesteeId, pendingWingman.wingmanId, users.userId, users.email, users.firstName, users.lastName, users.age, users.description, users.genderIdentity, users.maleGenderPref, users.femaleGenderPref, users.otherGenderPref FROM users INNER JOIN pendingWingman ON pendingWingman.requesterId = users.userId WHERE pendingWingman.requesteeId = ?"; 
    db.query(queryStatement, req.body.userId, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            wingmanResponse.error =  {
                "message": queryError.sqlMessage
            };
        } else {
            wingmanResponse.results = queryResults;
        }
        res.json(wingmanResponse);
    });
});

router.post("/matches", (req: Request, res: Response) => {
    const wingmanResponse: any = {
        "error": {},
        "results": []
    };

    if(!isWingmanMatchesRequest) {
        wingmanResponse.error = {
            "message": "Invalid request parameters"
        };
        res.json(wingmanResponse);
        return;
    }

    const queryStatement = "SELECT completedWingman.wingmanId, completedWingman.requestId, users.userId, users.email, users.firstName, users.lastName, users.age, users.description, users.genderIdentity, users.maleGenderPref, users.femaleGenderPref, users.otherGenderPref, FROM users INNER JOIN completedWingman ON completedWingman.requesteeId = users.userId WHERE completedWingman.requesterId = ?"; 
    db.query(queryStatement, req.body.userId, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            wingmanResponse.error =  {
                "message": queryError.sqlMessage
            };
        } else {
            wingmanResponse.results = queryResults
        }
        res.json(wingmanResponse);
    });
});

router.post("/unmatch", (req: Request, res: Response) => {
    const wingmanResponse: any = {
        "error": {},
        "results": []
    };

    if(!isWingmanUnmatchRequest) {
        wingmanResponse.error = {
            "message": "Invalid request parameters"
        };
        res.json(wingmanResponse);
        return;
    }

    const queryStatement = "DELETE FROM completedWingman WHERE requestId = ?)";
    const queryArgs = [req.body.requestId];
    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            wingmanResponse.error =  {
                "message": queryError.sqlMessage
            };
            res.json(wingmanResponse);
        } else {
            wingmanResponse.results = [{
                "success": true
            }];
        }
        res.json(wingmanResponse);
    });
});

router.post("/reject", (req: Request, res: Response) => {
    const wingmanResponse: any = {
        "error": {},
        "results": []
    };

    if(!isWingmanRejectRequest) {
        wingmanResponse.error = {
            "message": "Invalid request parameters"
        };
        res.json(wingmanResponse);
        return;
    }

    const queryStatement = "DELETE FROM pendingWingman WHERE requestId = ?";
    const queryArgs = [req.body.requestId];
    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            wingmanResponse.error =  {
                "message": queryError.sqlMessage
            };
            res.json(wingmanResponse);
        } else {
            const queryStatement2 = "DELETE FROM pendingWingman WHERE requestId = ?";
            const queryArgs2 = [req.body.requestId];
            db.query(queryStatement2, queryArgs2, (queryError2: MysqlError | null, queryResults2: any ) => {
                if (queryError2) {
                    wingmanResponse.error =  {
                        "message": queryError2.sqlMessage
                    };
                } else {
                    wingmanResponse.results = [{
                        "success": true
                    }]
                }
                res.json(wingmanResponse);
            });
        }
    });
});

router.post("/rejectedMatches", (req: Request, res: Response) => {
    const wingmanResponse: any = {
        "error": {},
        "results": []
    };

    if(!isWingmanRejectedMatchesRequest) {
        wingmanResponse.error = {
            "message": "Invalid request parameters"
        };
        res.json(wingmanResponse);
        return;
    }

    const queryStatement = `SELECT users.userId, users.email, users.firstName, users.lastName, users.age, users.description, users.genderIdentity, users.maleGenderPref, users.femaleGenderPref, users.otherGenderPref,
    users.phoneNumber FROM users INNER JOIN rejectedWingman ON rejectedWingman.requesterId = users.userId WHERE rejectedWingman.requesteeId = ? OR rejectedWingman.requesterId = ?`;
    const queryArgs = [req.body.userId, req.body.userId];
    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            wingmanResponse.error =  {
                "message": queryError.sqlMessage
            };
        } else {
            wingmanResponse.results = queryResults;
        }
        res.json(wingmanResponse);
    });
});

export default router;
