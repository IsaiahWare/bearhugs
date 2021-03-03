import bcrypt from "bcrypt";
import db from "./../db";
import express, { Response , Request } from "express";
import { MysqlError} from "mysql";

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}

interface RegisterResponse {
    error: MysqlError | null; 
    results: object[];
}

interface LoginResponse {
    error: MysqlError | Error | null;
    results: User[];
}

interface FindResponse {
    error: MysqlError | Error | null;
    results: User[]
}

const saltRounds: number = 10;

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
    bcrypt.hash(req.body.password, saltRounds).then((hashedPassword: string) => {
        const queryStatement: string = "INSERT INTO users SET ?";
        const queryArgs: object = {
            "email": req.body.email,
            "hashedPassword": hashedPassword,
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
        };

        db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any) => {
            const registerResponse: RegisterResponse = {
                "error": queryError,
                "results": queryResults
            };
            res.json(registerResponse);
        });
    });
});

router.post("/login", (req: Request, res: Response) => {
    const queryStatement: string = "SELECT * FROM users WHERE email = ?";
    const queryArgs: string[] = [
        req.body.email
    ];

    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any) => {
        if (queryError || queryResults.length !== 1) {
            const loginResponse: LoginResponse = {
                "error": queryError,
                "results": []
            };
            res.json(loginResponse);
        } else {
            bcrypt.compare(req.body.password, queryResults[0].hashedPassword, (compareError: Error, passwordsMatch: boolean) => {
                const loginResponse: LoginResponse = {
                    "error": compareError,
                    "results": [
                        {   
                            "id": queryResults[0].id,
                            "email": queryResults[0].email,
                            "firstName": queryResults[0].firstName,
                            "lastName": queryResults[0].lastName,
                        }
                    ]
                }; 
                res.json(loginResponse);
            });
        } 
    });
});

router.post("/find", (req: Request, res: Response) => {
    const queryStatement: string = "SELECT * FROM users WHERE id = ?";
    const queryArgs: string[] = [
        req.body.id
    ];

    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any ) => {
            const findResponse: FindResponse = {
                "error": queryError,
                "results": queryResults
            };
            res.json(findResponse);
    }); 
});

export default router;

