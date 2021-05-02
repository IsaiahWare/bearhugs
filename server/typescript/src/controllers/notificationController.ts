import bcrypt from "bcrypt";
import db from "./../db";
import express, { Response , Request } from "express";
import { MysqlError } from "mysql";
import {
} from "./../models/notificationControllerModels";

const router = express.Router();

router.post("/sendtwouser", (req: Request, res: Response) => {    
    const AddTwoNotificationResponse: any = {
        "error": {},
        "results": []
    };

    const queryStatement: string = "INSERT INTO notifications (userId1,userId2, message) VALUES (?,?,?)";
    const queryArgs = [req.body.userId1, req.body.userId2, req.body.message];
    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            AddTwoNotificationResponse.error =  {
                "message": queryError.sqlMessage
            };
            res.json(AddTwoNotificationResponse);
        } 

    }); 
});


router.post("/sendthreeuser", (req: Request, res: Response) => {    
    const AddThreeNotificationResponse: any = {
        "error": {},
        "results": []
    };

    const queryStatement: string = "INSERT INTO notifications (userId1,userId2, userId3, message) VALUES (?,?, ?,?)";
    const queryArgs = [req.body.userId1, req.body.userId2, req.body.userId3, req.body.message];
    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            AddThreeNotificationResponse.error =  {
                "message": queryError.sqlMessage
            };
            res.json(AddThreeNotificationResponse);
        } 

    }); 
});


router.post("/getnotifications", (req: Request, res: Response) => {
    const notificationResponse: any = {
        "error": {},
        "results": []
    };
    const queryStatement = "SELECT * FROM notifications WHERE userId1 = ? ORDER BY notificationDate "; 
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
