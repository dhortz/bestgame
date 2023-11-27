const express = require('express');
const router = express.Router();
const Round = require('../models/Round');
const Player = require('../models/Player');
const PlayerResults = require('../models/PlayerResults');
const Game = require('../models/Game');

// gets all round from a game
router.get('/:gameNumber', async (req, res) => {
    try {
        const { gameNumber } = req.params;

        const game = await Game.findOne({ gameNumber });

        console.log("Game =>", game);

        const round = await Round.find({ gameId: game._id });
        if (!round) {
            return res.status(404).json({ msg: 'Round not found in game #' + gameNumber });
        }

        res.status(200).json(round);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error => ' + err);
    }
});

// create a new round entry (aka new day)
router.post('/', async (req, res) => {
    try {
        const { gameNumber, day, week, pokemonNames } = req.body;

        // Check if the game exists
        const game = await Game.findOne({ gameNumber });
        if (!game) {
            return res.status(404).json({ msg: 'Game not found' });
        }

        // Create a new Round document
        const round = new Round({
            roundId: await Round.countDocuments() + 1,
            gameId: game._id,
            day,
            week,
            pokemonNames,
        });

        // Save the Round document
        const savedRound = await round.save();

        res.status(201).json(savedRound);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error => ' + err);
    }
});

// create a new player round entry
router.post('/:roundId/:playerName', async (req, res) => {
    try {
        const { roundId, playerName } = req.params;

        const { points } = req.body;

        // Find the player by name
        const player = await Player.findOne({ name: playerName });

        // Find the round by round number
        const round = await Round.findOne({ roundId });

        if (!player || !round) {
            return res.status(404).json({ msg: 'Player or round not found' });
        }

        // Create a new PlayerResult document
        const playerResult = new PlayerResults({
            player: player._id,
            round: round._id,
            points,
        });

        // Save the PlayerResult document
        const savedPlayerResult = await playerResult.save();

        res.status(201).json(savedPlayerResult);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error => ' + err);
    }
});

module.exports = router;