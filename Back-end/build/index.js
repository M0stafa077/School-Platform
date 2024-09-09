"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database/database");
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 4000;
app.get('/', (req, res) => {
    database_1.dbConnection.connect((err => {
        if (err)
            throw err;
        database_1.dbConnection.query('USE School_db;', err => { if (err)
            throw err; });
    }));
    res.json({
        myName: 'Mostafa Asaad',
        age: "22"
    });
});
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
