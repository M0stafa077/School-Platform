import express, { Application } from 'express';
import { dbConnection } from './database/database'

const app:Application = express();
const port = process.env.APP_PORT || 4000;

app.get('/', (req, res) => {   
    res.json({
        project: 'Full-Stack, Long-Term Simple School Platform'
    });
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});