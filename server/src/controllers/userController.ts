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
    UserRandomResponse,
    FindByEmailRequest,
    FindByEmailResponse
} from "./../models/userControllerModels";
import {
    isUserFindByEmailRequest,
    isUserRegisterRequest,
    isUserLoginRequest,
    isUserFindRequest,
    isUserRandomRequest
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
                        "userId": queryResults.insertId,
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
                            "age": queryResults[0].age,
                            "description": queryResults[0].description
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

    const queryStatement: string = "SELECT userId, email, firstName, lastName, age, description, genderIdentity, genderPreferences FROM users WHERE userId = ?";
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

router.post("/findbyemail", (req: Request, res: Response) => {    
    const findResponse: FindByEmailResponse = {
        "error": {},
        "results": []
    };

    if (!isUserFindByEmailRequest(req.body)) {
        findResponse.error = {
            "message": "Invalid request parameters!"
        };
        res.json(findResponse);
        return;
    }

    const queryStatement: string = "SELECT userId, email, firstName, lastName, age, description, genderIdentity, genderPreferences FROM users WHERE email= ?";
    db.query(queryStatement, req.body.email, (queryError: MysqlError | null, queryResults: any ) => {
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



function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

router.post("/random", (req: Request, res: Response) => {    
    const randomResponse: UserRandomResponse = {
        "error": {},
        "results": []
    };

    if (!isUserRandomRequest(req.body)) {
        randomResponse.error = {
            "message": "Invalid request parameters!"
        };
        res.json(randomResponse);
        return;
    }

    const queryStatement: string = "SELECT userId, email, firstName, lastName, age, description FROM users LIMIT ?";
    db.query(queryStatement, req.body.count, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            randomResponse.error =  {
                "message": queryError.sqlMessage
            };
        } else {
            shuffleArray(queryResults);
            randomResponse.results = queryResults.slice(0, req.body.count);
        }
        res.json(randomResponse);
    }); 
});

router.post("/update", (req: Request, res: Response) => {
    const updateResponse: any = {
        "error": {},
        "results": []
    };
    
    const queryStatement: string = "UPDATE users SET email = ?, firstName = ?, lastName = ?, description = ?, genderIdentity = ?, genderPreferences = ? WHERE userId = ?";
    const queryArgs = [
        req.body.email,
        req.body.firstName,
        req.body.lastName,
        req.body.description,
        req.body.genderIdentity,
        req.body.genderPreferences,
        req.body.userId
    ];

    db.query(queryStatement, queryArgs, (queryError: MysqlError | null, queryResults: any) => {
        if (queryError) {
            updateResponse.error = {
                "message": queryError.sqlMessage
            };
        } else {
            updateResponse.results = [
                {
                    "userId": req.body.userId,
                    "email": req.body.email,
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "genderIdentity": req.body.genderIdentity,
                    "genderPreferences": req.body.genderPreferences,
                    "description": req.body.description
                }
            ];
        }
        res.json(updateResponse);
    });
});
export default router;

