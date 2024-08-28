require('dotenv').config();
const express = require('express');
const http = require('http');

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

const dbConnect = require('./config/database');
dbConnect();

const { socketHandler } = require('./socket/socketHandler'); // Importing socketHandler
const server = http.createServer(app);
socketHandler(server); // Using socketHandler

server.listen(port, () => {
    console.log('Server and web socket running at port ' + port);
});

app.get('/', (req, res) => {
    res.send('Backend is running');
});
