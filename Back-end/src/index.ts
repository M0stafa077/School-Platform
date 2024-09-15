import express, { Application } from 'express';
import { dbConnection } from './database/database'
import { StudentModel } from './Models/student.model'
import studentRoutes  from './Routes/student.routes'

const app:Application = express();
const port = process.env.APP_PORT || 4000;

app.get('/', async (req, res) => {
    res.json({
        project: 'Full-Stack, Long-Term Simple School Platform'
    });
});
app.use('/students', studentRoutes);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});