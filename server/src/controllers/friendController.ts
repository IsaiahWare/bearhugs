import bcrypt from "bcrypt";
import db from "./../db";
import express, {Request, Response} from "express";
import { MysqlError } from "mysql";
import { User } from "./../models/userControllerModels";
import { UserFriendFindRequest, UserFriendFindResponse } from "./../models/friendControllerModels";
import { isUserFriendFindRequest } from "./../checkers/friendControllerModelsChecker";

const router = express.Router();

router.post("/find", (req: Request, res: Response) => {
    const userFriendFindResponse: UserFriendFindResponse = {
        "error": {},
        "results": []
    };

    if (!isUserFriendFindRequest(req.body)) {
        userFriendFindResponse.error = {
            "message": "Invalid request parameters!"
        };
        res.json(userFriendFindResponse);
        return;
    }

    const queryStatement: string = "SELECT friends.userId2 as friendId FROM users INNER JOIN friends ON users.userId = friends.userId1 WHERE friends.userId1 = ?";
    db.query(queryStatement, req.body.userId, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            userFriendFindResponse.error = {
                "message": queryError.sqlMessage
            };
        }
        else {
            const queryStatement2: string = "SELECT users.id, users.email, users.age, users.gender FROM users WHERE userId in ?";
            const queryArgs: number[] = [];
            for (let i = 0; i < queryResults.length; i++) {
                queryArgs.push(queryResults[i].friendId);
            }
            db.query(queryStatement2, queryArgs, (queryError2: MysqlError | null, queryResults2: any ) => {
                if (queryError2) {
                    userFriendFindResponse.error = {
                        "message": queryError2.sqlMessage
                    };
                }
                else {
                    userFriendFindResponse.results = queryResults2;
                }
            })
        res.json(userFriendFindResponse);
    }});
});

export default router;
