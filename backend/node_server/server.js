
import cors from 'cors';
import express from 'express';
import http from 'http';
import Logger from './config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv.config';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: message => Logger.info(message.trim()) } }));
app.use(helmet(
    {
        contentSecurityPolicy: false,
    }
));

app.get('/', (req, res) => {
    res.send('AuditAI Backend is running');
    Logger.info('Root endpoint accessed');
});

const server = http.createServer(app);

const port =process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});