import bcrypt from "bcrypt";
import db from "./../db";
import express, { Response , Request } from "express";
import { MysqlError } from "mysql";
import {
    User,
    UserRegisterRequest,
    UserRegisterResponse,
    UserLoginRequest,
    UserLoginResponse,
    UserFindRequest,
    UserFindResponse,
    UserRandomRequest,
    UserRandomResponse
} from "./../models/userControllerModels";
import {
    isUserRegisterRequest,
    isUserLoginRequest,
    isUserFindRequest,
    isUserRandomRequest
} from "./../checkers/userControllerModelsChecker";

const saltRounds: number = 10;
const router = express.Router();

router.post("/match", (req: Request, res: Response) => {    
    const matchResponse: any = {
        "error": {},
        "results": []
    };

    const queryStatement: string = "SELECT userId, email, firstName, lastName, age, description FROM users LIMIT ?";
    db.query(queryStatement, req.body.count, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            matchResponse.error =  {
                "message": queryError.sqlMessage
            };
        } else {
            matchResponse.results = queryResults.slice(0, req.body.count);
        }
        res.json(matchResponse);
    }); 
});

export default router;

