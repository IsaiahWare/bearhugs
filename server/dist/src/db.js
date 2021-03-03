"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const db = mysql_1.default.createPool({
    "connectionLimit": 10,
    "host": "localhost",
    "user": "root",
    "password": "password123",
    "database": "bearhugs"
});
exports.default = db;
