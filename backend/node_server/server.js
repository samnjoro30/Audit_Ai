
const cors = require('cors');
const express = require('express');
const http = require('http');


const app = express();
app.use(express.json());

const server = http.createServer(app);

const port = 5000;

server.listen(port, () => console.log(`Server is running on port ${port}`));