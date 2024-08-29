require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(express.json({ limit: '50mb' }));

const routes = require('./route/routes');
app.use('/api', routes);

const dbConnect = require('./config/database');
dbConnect();

const socketHandler = require('./socket/socketHandler');
const server = http.createServer(app);
socketHandler(server);
server.listen(port, () => {
    console.log('Server and web socket running at port ' + port);
});

app.get('/', (req, res) => {
    res.send('Backend is running');
});
