import db from "../db";
import express, { Response , Request } from "express";
import { MysqlError } from "mysql";
import {
} from "../models/userControllerModels";
import {
} from "../checkers/userControllerModelsChecker";

const router = express.Router();

router.post("/send", (req: Request, res: Response) => {    
    const wingmanResponse: any = {
        "error": {},
        "results": []
    };

    const queryStatement: string = "SELECT requesterId FROM pendingWingman WHERE wingmanId = ? AND requesteeId = ? AND requesterId = ?";
    const queryArgs = [req.body.wingmanId, req.body.requesteeId, req.body.requesterId];
    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            wingmanResponse.error =  {
                "message": queryError.sqlMessage
            };
            res.json(wingmanResponse);
        } 
        else {
            if (queryResults.length === 1) {
                    wingmanResponse.error =  {
                        "message": "Request already sent"
                    };
                res.json(wingmanResponse);
            } 
            else {
                const queryStatement3: string = "SELECT requesterId FROM pendingWingman WHERE wingmanId = ? AND requesteeId = ? AND requesterId = ?";
                const queryArgs3 = [req.body.wingmanId, req.body.requesterId, req.body.requesteeId];
                db.query(queryStatement3, queryArgs3, (queryError3: MysqlError | null, queryResults3: any ) => {
                    if (queryError3) {
                        wingmanResponse.error =  {
                            "message": queryError3.sqlMessage
                        };
                        res.json(wingmanResponse);
                    } else if (queryResults3.length === 1) {
                        const queryStatement4: string = "INSERT INTO completedWingman SET ?";
                        const queryArgs4 = {
                                "wingmanId": req.body.wingmanId,
                                "requesterId": req.body.requesterId,
                                "requesteeId": req.body.requesteeId
                        };
                        db.query(queryStatement4, queryArgs4, (queryError4: MysqlError | null, queryResults4: any ) => {
                            if (queryError4) {
                                wingmanResponse.error =  {
                                    "message": queryError4.sqlMessage
                                };
                                res.json(wingmanResponse);
                            } else {
                                const queryStatement4: string = "INSERT INTO completedWingman SET ?";
                                const queryArgs4 = {
                                        "wingmanId": req.body.wingmanId,
                                        "requesterId": req.body.requesterId,
                                        "requesteeId": req.body.requesteeId
                                };
                                db.query(queryStatement4, queryArgs4, (queryError4: MysqlError | null, queryResults4: any ) => {
                                    if (queryError4) {
                                        wingmanResponse.error =  {
                                            "message": queryError4.sqlMessage
                                        };
                                        res.json(wingmanResponse);
                                    } else {
                                        const queryStatement7: string = "INSERT INTO completedWingman SET ?";
                                        const queryArgs7 = {
                                                "wingmanId": req.body.wingmanId,
                                                "requesterId": req.body.requesteeId,
                                                "requesteeId": req.body.requesterId
                                        };
                                        db.query(queryStatement7, queryArgs7, (queryError7: MysqlError | null, queryResults7: any ) => {
                                            if (queryError7) {
                                                wingmanResponse.error =  {
                                                    "message": queryError7.sqlMessage
                                                };
                                                res.json(wingmanResponse);
                                            } else {
                                                const queryStatement5: string = "DELETE FROM pendingWingman WHERE wingmanId = ? AND requesteeId = ? AND requesterId = ?";
                                                const queryArgs5 = [req.body.wingmanId, req.body.requesteeId, req.body.requesterId];
                                                db.query(queryStatement5, queryArgs5, (queryError5: MysqlError | null, queryResults5: any ) => {
                                                    if (queryError5) {
                                                        wingmanResponse.error =  {
                                                            "message": queryError5.sqlMessage
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
                                    }
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
            }
        }
    }); 
});

router.post("/matches", (req: Request, res: Response) => {
    const wingmanResponse: any = {
        "error": {},
        "results": []
    };
    const queryStatement = "SELECT completedWingman.wingmanId, users.userId, users.email, users.firstName, users.lastName, users.age, users.description, users.genderIdentity, users.genderPreferences FROM users INNER JOIN completedWingman ON completedWingman.requesteeId = users.userId WHERE completedWingman.requesterId = ?"; 
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

router.post("/requests", (req: Request, res: Response) => {
    const wingmanResponse: any = {
        "error": {},
        "results": []
    };
    const queryStatement = "SELECT pendingWingman.wingmanId, users.userId, users.email, users.firstName, users.lastName, users.age, users.description, users.genderIdentity, users.genderPreferences FROM users INNER JOIN pendingWingman ON pendingWingman.requesterId = users.userId WHERE pendingWingman.requesteeId = ?"; 
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

router.post("/unmatch", (req: Request, res: Response) => {
    const wingmanResponse: any = {
        "error": {},
        "results": []
    };
    const queryStatement = "DELETE FROM completedWingman WHERE wingmanId = ? AND requesterId = ? AND requesteeId = ?";
    const queryArgs = [req.body.wingmanId, req.body.requesterId, req.body.requesteeId];
    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            wingmanResponse.error =  {
                "message": queryError.sqlMessage
            };
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
    const queryStatement = "DELETE FROM pendingWingman WHERE wingmanId = ? AND requesterId = ? AND requesteeId = ?";
    const queryArgs = [req.body.wingmanId, req.body.requesterId, req.body.requesteeId];
    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            wingmanResponse.error =  {
                "message": queryError.sqlMessage
            };
        } else {
            wingmanResponse.results = [{
                "success": true
            }]
        }
        res.json(wingmanResponse);
    });
});

export default router;
