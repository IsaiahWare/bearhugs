import mysql from "mysql";

const db = mysql.createPool({
    "connectionLimit": 10, 
    "host": "localhost",
    "user": "root",
    "password": "password123",
    "database": "bearhugs"
});

export default db;
