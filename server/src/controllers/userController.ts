import bcrypt from "bcrypt";
import db from "./../db";
import express, { Response , Request } from "express";
import { MysqlError } from "mysql";

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}

interface RegisterRequest {
   email: string;
   password: string;
   firstName: string;
   lastName: string;
}

interface LoginRequest {
   email: string;
   password: string;
}

interface FindRequest {
   id: string;
}

interface RegisterResponse {
    error: MysqlError | object; 
    results: object[];
}

interface LoginResponse {
    error: MysqlError | Error | object;
    results: User[];
}

interface FindResponse {
    error: MysqlError | Error | object;
    results: User[]
}

const saltRounds: number = 10;

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
    const queryArgs: RegisterRequest = {
        "email": req.body.email,
        "password": req.body.password,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
    };
    const registerResponse: RegisterResponse = {
        "error": {},
        "results": []
    };
    bcrypt.hash(queryArgs.password, saltRounds).then((hashedPassword: string) => {
        const queryStatement: string = "INSERT INTO users SET ?";
        queryArgs.password = hashedPassword;
        db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any) => {
            if (queryError) {
                registerResponse.error = {
                    "message": queryError.sqlMessage
                };
            } else {
                registerResponse.results = [
                    {
                        "id": queryResults.insertId,
                        "email": queryArgs.email,
                        "firstName": queryArgs.firstName,
                        "lastName": queryArgs.lastName
                    }
                ];
            }
            res.json(registerResponse);
        });
    });
});

router.post("/login", (req: Request, res: Response) => {
    const queryStatement: string = "SELECT * FROM users WHERE email = ?";
    const queryArgs: LoginRequest = {
        email: req.body.email,
        password: req.body.password
    };
    const loginResponse: LoginResponse = {
        "error": {},
        "results": []
    };
    db.query(queryStatement, queryArgs.email, (queryError: MysqlError | null, queryResults: any) => {
        if (queryError) { 
            loginResponse.error = {
                "message": queryError.sqlMessage
            };
        } 
        else if (queryResults.length !== 1) { 
                loginResponse.error = {
                    "message": "Invalid email"
                };
        }
        else {
            bcrypt.compare(req.body.password, queryResults[0].hashedPassword, (compareError: Error, passwordsMatch: boolean) => {
                if (compareError) {
                        loginResponse.error = compareError;
                }
                else if (passwordsMatch) {
                    loginResponse.results = [
                        {   
                            "id": queryResults[0].id,
                            "email": queryResults[0].email,
                            "firstName": queryResults[0].firstName,
                            "lastName": queryResults[0].lastName,
                        }
                    ];
                }
                else {
                    loginResponse.error = {
                        "message": "Invalid password"
                    };
                }; 
            });
        } 
        res.json(loginResponse);      
    });
});

router.post("/find", (req: Request, res: Response) => {
    const queryStatement: string = "SELECT * FROM users WHERE id = ?";
    const queryArgs: FindRequest = {
        "id": req.body.id
    };
    const findResponse: FindResponse = {
        "error": {},
        "results": []
    };
    db.query(queryStatement, queryArgs.id, (queryError: MysqlError | null, queryResults: any ) => {
            findResponse.error = queryError ? {
                "message": queryError.sqlMessage
            } : {};
            findResponse.results = queryError ? [] : [queryResults];
            res.json(findResponse);
    }); 
});

export default router;

