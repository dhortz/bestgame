const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Results = require('../models/Results');

// return list of games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find({});
        res.status(200).json(games);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// starts a new game
router.post('/newgame', async (req, res) => {
    try {
        const gameNumber = await Game.countDocuments() + 1;
        const newGame = {
            gameNumber,
            startDate: new Date(),
            playersCount: 0,
            winner: null
        };
        const savedGame = await Game.findOneAndUpdate(
            { gameNumber },
            newGame,
            { upsert: true, new: true }
        );

        const newResults = {
            game: savedGame._id,
            resultsId: await Results.countDocuments() + 1,
            day: "Monday",
            week: 1,
            pokemonNames: req.body.pokemon
        };
        const savedResults = await Results.create(newResults);

        res.status(201).json({
            gameNumber: savedGame.gameNumber,
            resultsId: savedResults.resultsId,
            pokemon: savedResults.pokemon
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// deletes all games
router.delete('/', async (req, res) => {
    try {
        // Delete all resultss
        await Results.deleteMany({});

        // Delete all games
        await Game.deleteMany({});


        res.status(200).json({ message: 'All games and results deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// deletes a game
router.delete('/:gameNumber', async (req, res) => {
    try {
        const gameNumber = req.params.gameNumber;

        // Delete resultss related to the game
        await Results.deleteMany({ game: gameNumber });

        // Delete game
        const deletedGame = await Game.findOneAndDelete({ gameNumber: gameNumber });

        if (!deletedGame) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.status(200).json({ message: `Game ${gameNumber} and related results deleted` });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;