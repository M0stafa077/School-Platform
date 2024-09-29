"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_routes_1 = __importDefault(require("./Routes/student.routes"));
const teacher_routes_1 = require("./Routes/teacher.routes");
const grades_routes_1 = __importDefault(require("./Routes/grades.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const yaml_1 = __importDefault(require("yaml"));
const swaggerFileContents = fs_1.default.readFileSync(path_1.default.join(__dirname, "../docs/swagger.yml"), "utf8");
const swaggerDocument = yaml_1.default.parse(swaggerFileContents);
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 4000;
app.use(express_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.get("/", async (req, res) => {
    res.json({
        project: "Full-Stack, Long-Term Simple School Platform",
    });
});
app.use("/students", student_routes_1.default);
app.use("/teachers", teacher_routes_1.teacherRoutes);
app.use("/grades", grades_routes_1.default);
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
