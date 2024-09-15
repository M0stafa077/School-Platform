"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_routes_1 = __importDefault(require("./Routes/student.routes"));
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 4000;
app.get('/', async (req, res) => {
    res.json({
        project: 'Full-Stack, Long-Term Simple School Platform'
    });
});
app.use('/students', student_routes_1.default);
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
