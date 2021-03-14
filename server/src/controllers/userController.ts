import bcrypt from "bcrypt";
import db from "./../db";
import express, { Response , Request } from "express";
import { MysqlError } from "mysql";
import {
    User,
    UserLoginRequest,
    UserLoginResponse,
    UserFindRequest,
    UserFindResponse,
    UserRegisterRequest,
    UserRegisterResponse,
} from "./../models/userControllerModels";
import {
    isUserRegisterRequest,
    isUserLoginRequest,
    isUserFindRequest,
} from "./../checkers/userControllerModelsChecker";

const saltRounds: number = 10;
const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
    const registerResponse: UserRegisterResponse = {
        "error": {},
        "results": []
    };
    
    if (!isUserRegisterRequest(req.body)) {
        registerResponse.error = {
            "message": "Invalid request parameters!"
        };
        res.json(registerResponse);
        return;
    }

    bcrypt.hash(req.body.password, saltRounds).then((hashedPassword: string) => {
        const queryStatement: string = "INSERT INTO users SET ?";
        req.body.password = hashedPassword;

        db.query(queryStatement, req.body, (queryError: MysqlError | null, queryResults: any) => {
            if (queryError) {
                registerResponse.error = {
                    "message": queryError.sqlMessage
                };
            } else {
                registerResponse.results = [
                    {
                        "id": queryResults.insertId,
                        "email": req.body.email,
                        "firstName": req.body.firstName,
                        "lastName": req.body.lastName
                    }
                ];
            }
            res.json(registerResponse);
        });
    });
});

router.post("/login", (req: Request, res: Response) => {
    console.log(req.body)
    const loginResponse: UserLoginResponse = {
        "error": {},
        "results": []
    };

    if (!isUserLoginRequest(req.body)) {
        loginResponse.error = {
            "message": "Invalid request parameters!"
        };
        res.json(loginResponse);
        return;
    }

    const queryStatement: string = "SELECT * FROM users WHERE email = ?";
    db.query(queryStatement, req.body.email, (queryError: MysqlError | null, queryResults: any) => {
        console.log(queryResults)
        if (queryError) { 
            loginResponse.error = {
                "message": queryError.sqlMessage
            };
            res.json(loginResponse);
        } 
        else if (queryResults.length !== 1) { 
            loginResponse.error = {
                "message": "Invalid email"
            };
            res.json(loginResponse);
        }
        else {
            bcrypt.compare(req.body.password, queryResults[0].password, (compareError: Error, passwordsMatch: boolean) => {
                if (compareError) {
                    loginResponse.error = compareError;
                }
                else if (passwordsMatch) {
                    loginResponse.results = [
                        {   
                            "userId": queryResults[0].userId,
                            "email": queryResults[0].email,
                            "firstName": queryResults[0].firstName,
                            "lastName": queryResults[0].lastName,
                            "age": queryResults[0].age
                        }
                    ];
                }
                else {
                    loginResponse.error = {
                        "message": "Invalid password"
                    };
                }; 
                res.json(loginResponse);    
            });
        } 
    });
});

router.post("/find", (req: Request, res: Response) => {    
    const findResponse: UserFindResponse = {
        "error": {},
        "results": []
    };

    if (!isUserFindRequest(req.body)) {
        findResponse.error = {
            "message": "Invalid request parameters!"
        };
        res.json(findResponse);
        return;
    }

    const queryStatement: string = "SELECT userId, email, firstName, lastName, age FROM users WHERE userId = ?";
    db.query(queryStatement, req.body.userId, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            findResponse.error =  {
                "message": queryError.sqlMessage
            };
        } else if (queryResults.length !== 1) {
            findResponse.error = {
                "message": "No user found"
            };
        } else {
            findResponse.results = queryResults;
        }
        res.json(findResponse);
    }); 
});

export default router;

