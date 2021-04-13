import bcrypt from "bcrypt";
import db from "./../db";
import express, { Response , Request } from "express";
import { MysqlError } from "mysql";
import {
} from "./../models/notificationControllerModels";

const router = express.Router();

router.post("/send", (req: Request, res: Response) => {    
    const notificationResponse: any = {
        "error": {},
        "results": []
    };

    const queryStatement: string = "INSERT INTO notifications (userId1,userId2, message) VALUES (?,?,?)";
    const queryArgs = [req.body.uidOne, req.body.uidTwo, req.body.message];
    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            notificationResponse.error =  {
                "message": queryError.sqlMessage
            };
            res.json(notificationResponse);
        } 

    }); 
});


router.post("/getnotifications", (req: Request, res: Response) => {
    const notificationResponse: any = {
        "error": {},
        "results": []
    };
    const queryStatement = "SELECT * FROM notifications WHERE userId1 = ?"; 
    db.query(queryStatement, req.body.userId, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            notificationResponse.error =  {
                "message": queryError.sqlMessage
            };
        } else {
            notificationResponse.results = queryResults
        }
        res.json(notificationResponse);
    });
});

export default router;
