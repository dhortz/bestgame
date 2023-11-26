const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// create the Express app
const app = express();

app.use(cors());

// set up bodyParser middleware
app.use(bodyParser.json());

const playerController = require('./controllers/PlayerController');
const gameController = require('./controllers/GameController');
const resultsController = require('./controllers/ResultsController');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/bestgame', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database!');
}).catch((err) => {
    console.log(err);
    console.log('Failed to connect to the database!');
});

// player related endpoints
app.use('/api/players', playerController);
app.use('/api/games', gameController);
app.use('/api/results', resultsController);

// start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
