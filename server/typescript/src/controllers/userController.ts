import bcrypt from "bcrypt";
import db from "./../db";
import express, { Response , Request } from "express";
import { MysqlError } from "mysql";
import {
    UserRegisterResponse,
    UserLoginResponse,
    UserFindResponse,
    UserRandomResponse,
    FindByEmailResponse,
    UserResetPasswordRequest
} from "./../models/userControllerModels";
import {
    isUserFindByEmailRequest,
    isUserRegisterRequest,
    isUserLoginRequest,
    isUserFindRequest,
    isUserRandomRequest,
    isUserUpdateRequest,
    isUserPhoneRequest,
    isUserResetPasswordRequest,
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
                        "lastName": req.body.lastName,
                        "age": req.body.age,
                        "genderIdentity": req.body.genderIdentity,
                        "maleGenderPref": req.body.maleGenderPref,
                        "femaleGenderPref": req.body.femaleGenderPref,
                        "otherGenderPref": req.body.otherGenderPref,
                        "phoneNumber": req.body.phoneNumber,
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
                                "description": queryResults[0].description,
                                "genderIdentity":queryResults[0].genderIdentity,
                                "maleGenderPref": queryResults[0].maleGenderPref,
                                "femaleGenderPref": queryResults[0].femaleGenderPref,
                                "otherGenderPref": queryResults[0].otherGenderPref,
                                "phoneNumber": queryResults[0].phoneNumber
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

    const queryStatement: string = "SELECT userId, email, firstName, lastName, age, description, genderIdentity, maleGenderPref, femaleGenderPref, otherGenderPref, phoneNumber FROM users WHERE userId = ?";
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

    const queryStatement: string = "SELECT userId, email, firstName, lastName, age, description, genderIdentity, maleGenderPref, femaleGenderPref, otherGenderPref FROM users WHERE email= ?";
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

    const queryStatement: string = "SELECT userId, email, firstName, lastName, age, description, phoneNumber, maleGenderPref, femaleGenderPref, otherGenderPref FROM users LIMIT ?";
    const queryArgs = [req.body.count];
    db.query(queryStatement, req.body.count, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            randomResponse.error =  {
                "message": queryError.sqlMessage
            };
        } else {
	    console.log("user/random results", queryResults.length);
            // shuffleArray(queryResults);
            randomResponse.results = queryResults
        }
        res.json(randomResponse);
    }); 
});

router.post("/update", (req: Request, res: Response) => {
    const updateResponse: any = {
        "error": {},
        "results": []
    };

    if (!isUserUpdateRequest(req.body)) {
        updateResponse.error = {
            "message": "Invalid request parameters!"
        };
        res.json(updateResponse);
        return;
    }    
    
    const queryStatement: string = "UPDATE users SET email = ?, description = ?, genderIdentity = ?, maleGenderPref = ?, femaleGenderPref =?, otherGenderPref=?, phoneNumber=? WHERE userId = ?";
    const queryArgs = [
        req.body.email,
        // req.body.password,
        req.body.description,
        req.body.genderIdentity,
        req.body.maleGenderPref,
        req.body.femaleGenderPref,
        req.body.otherGenderPref,
        req.body.phoneNumber,
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
                    // "password": req.body.password,
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "genderIdentity": req.body.genderIdentity,
                    "maleGenderPref":req.body.maleGenderPref,
                    "femaleGenderPref":req.body.femaleGenderPref,
                    "otherGenderPref":req.body.otherGenderPref,
                    "description": req.body.description,
                    "phoneNumber": req.body.phoneNumber,

                }
            ];
        }
        res.json(updateResponse);
    });
});

router.post("/phone", (req: Request, res: Response) => {    
    const phoneResponse: any = {
        "error": {},
        "results": []
    };

    if (!isUserPhoneRequest(req.body)) {
        phoneResponse.error = {
            "message": "Invalid request parameters!"
        };
        res.json(phoneResponse);
        return;
    }

    const queryStatement: string = "SELECT userId, email, firstName, lastName, age, description, genderIdentity, maleGenderPref, femaleGenderPref, otherGenderPref FROM users WHERE phoneNumber = ?";
    db.query(queryStatement, req.body.phoneNumber, (queryError: MysqlError | null, queryResults: any ) => {
        if (queryError) {
            phoneResponse.error =  {
                "message": queryError.sqlMessage
            };
        } else {
            shuffleArray(queryResults);
            phoneResponse.results = queryResults
        }
        res.json(phoneResponse);
    }); 
});

router.post("/updatePassword", (req: Request, res: Response) => {
    const updateResponse: any = {
        "error": {},
        "results": []
    };
    
    const queryStatement: string = "UPDATE users SET password = ? WHERE email = ?";
    const queryArgs = [
        req.body.password,
        req.body.email
    ];
    bcrypt.hash(req.body.password, saltRounds).then((hashedPassword: string) => {
        db.query(queryStatement, [hashedPassword, req.body.email], (queryError: MysqlError | null, queryResults: any) => {
            if (queryError) {
                updateResponse.error = {
                    "message": queryError.sqlMessage
                };
            } else {
                updateResponse.results = [
                    {
                        "success": true

                    }
                ];
            }
            res.json(updateResponse);
        });
    });
});


export default router;
