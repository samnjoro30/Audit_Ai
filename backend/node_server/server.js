
import cors from 'cors';
import express from 'express';
import http from 'http';
import Logger from './config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import 'dotenv/config';
import cluster from 'cluster'
import os from 'os';
import { time } from 'console';
import { uptime } from 'process';
import xssClean from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

import connectToNoSQLDatabase from './config/database_nosql.js';

//routes 
import authRoutes from './routes/authRoutes.js';

connectToNoSQLDatabase();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.disable('x-powered-by');
app.use(compression());
app.use(xssClean());
app.use(mongoSanitize());
app.use(morgan('combined', { 
    stream: { write: message => Logger.info(message.trim()) 
} }));
app.use(helmet(
    {
        
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "https://trusted.cdn.com"],
                styleSrc: ["'self'", "https://trusted.cdn.com"],
                imgSrc: ["'self'", "data:", "https://trusted.cdn.com"],
                connectSrc: ["'self'", "https://api.trusted.com"],
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        },
    }
));
const CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(CorsOptions));

//  Routes
app.use('/auth', authRoutes);

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


process.on('SIGTERM', () => {
    server.close(() => {
        Logger.info('Graceful shutdown');
        process.exit(0);
    });
});


const port =process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});