
import cors from 'cors';
import express from 'express';
import http from 'http';
import 'dotenv.config';


const app = express();
app.use(express.json());

const server = http.createServer(app);

const port =process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});