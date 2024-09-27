import express, { Application } from 'express';
import studentRoutes  from './Routes/student.routes'
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import yml from 'yaml';

const swaggerFileContents = fs.readFileSync(path.join(__dirname, "../docs/swagger.yml"), 'utf8');
const swaggerDocument = yml.parse(swaggerFileContents);

const app:Application = express();
const port = process.env.APP_PORT || 4000;
app.use(express.json());
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.get('/', async (req, res) => {
    res.json({
        project: 'Full-Stack, Long-Term Simple School Platform'
    });
});
app.use('/students', studentRoutes);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});