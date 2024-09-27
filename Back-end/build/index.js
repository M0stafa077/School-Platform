"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const student_routes_1 = __importDefault(require("./Routes/student.routes"));
const yaml_1 = __importDefault(require("yaml"));
const swaggerFilePath = path_1.default.join(__dirname, "../docs/swagger.yml");
const swaggerFileContents = fs_1.default.readFileSync(swaggerFilePath, 'utf8');
const swaggerDocument = yaml_1.default.parse(swaggerFileContents);
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 4000;
app.use(express_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.get('/', async (req, res) => {
    res.json({
        project: 'Full-Stack, Long-Term Simple School Platform'
    });
});
app.use('/students', student_routes_1.default);
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
