"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("./../../db"));
const express_1 = __importDefault(require("express"));
const saltRounds = 10;
const router = express_1.default.Router();
router.post("/register", (req, res) => {
    bcrypt_1.default.hash(req.body.password, saltRounds).then((hashedPassword) => {
        const queryStatement = "INSERT INTO users SET ?";
        const queryArgs = {
            "email": req.body.email,
            "hashedPassword": hashedPassword,
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
        };
        db_1.default.query(queryStatement, queryArgs, (queryError, queryResults) => {
            const registerResponse = {
                "error": queryError,
                "results": queryResults
            };
            res.json(registerResponse);
        });
    });
});
router.post("/login", (req, res) => {
    const queryStatement = "SELECT * FROM users WHERE email = ?";
    const queryArgs = [
        req.body.email
    ];
    db_1.default.query(queryStatement, queryArgs, (queryError, queryResults) => {
        if (queryError || queryResults.length !== 1) {
            const loginResponse = {
                "error": queryError,
                "results": []
            };
            res.json(loginResponse);
        }
        else {
            bcrypt_1.default.compare(req.body.password, queryResults[0].hashedPassword, (compareError, passwordsMatch) => {
                const loginResponse = {
                    "error": compareError,
                    "results": passwordsMatch
                };
                res.json(loginResponse);
            });
        }
    });
});
router.post("/find", (req, res) => {
    const queryStatement = "SELECT * FROM users WHERE id = ?";
    const queryArgs = [
        req.body.id
    ];
    db_1.default.query(queryStatement, queryArgs, (queryError, queryResults) => {
        const findResponse = {
            "error": queryError,
            "results": queryResults
        };
        res.json(findResponse);
    });
});
exports.default = router;
