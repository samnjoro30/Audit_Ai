
import cors from 'cors';
import express from 'express';
import http from 'http';
import Logger from './config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { time } from 'console';
import { uptime } from 'process';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('combined', { stream: { write: message => Logger.info(message.trim()) } }));
app.use(helmet(
    {
        contentSecurityPolicy: false,
    }
));

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        message: 'Welcome to the AuditAI API'
    });
    Logger.info('Root endpoint accessed');
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
    Logger.info('Health check endpoint accessed');
});

const server = http.createServer(app);

const port =process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});