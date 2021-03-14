import bcrypt from "bcrypt";
import db from "./../db";
import express, {Request, Response} from "express";
import { MysqlError } from "mysql";
import { User } from "./../models/userControllerModels";
import { UserFriendRequest } from "./../models/friendControllerModels";
import { isUserFriendRequest } from "./../checkers/friendControllerModelsChecker";

const router = express.Router();

router.post("/find", (req: Request, res: Response) => {
    const UserFriendResponse = {
        "error": {},
        "results": []
    };

    if (!isUserFriendRequest(req.body)) {
        UserFriendResponse.error = {
            "message": "Invalid request parameters!"
        };
        res.json(UserFriendResponse);
        return;
    }

    const queryStatement: string = "SELECT friends.userId2 as friends FROM users INNER JOIN friends ON users.userId = friends.userId1 WHERE friends.userId1 = ?";
    db.query(queryStatement, req.body.userId, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            UserFriendResponse.error = {
                "message": queryError.sqlMessage
            };
        }
        else {
            UserFriendResponse.results = queryResults;
        }
        res.json(UserFriendResponse);
    });
});

export default router;
