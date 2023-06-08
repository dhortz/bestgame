const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Round = require('../models/Round');

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
            roundsPlayed: 1,
            playersCount: 0,
            winner: null
        };
        const savedGame = await Game.findOneAndUpdate(
            { gameNumber },
            newGame,
            { upsert: true, new: true }
        );

        const newRound = {
            game: savedGame._id,
            roundNumber: 1,
            pokemon: [req.body.pokemon],
            roundType: "single",
            players: [],
            readyPlayers: []
        };
        const savedRound = await Round.create(newRound);

        res.status(201).json({
            gameNumber: savedGame.gameNumber,
            roundNumber: savedRound.roundNumber,
            pokemon: savedRound.pokemon
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// deletes all games
router.delete('/', async (req, res) => {
    try {
        // Delete all rounds
        await Round.deleteMany({});

        // Delete all games
        await Game.deleteMany({});


        res.status(200).json({ message: 'All games and rounds deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// deletes a game
router.delete('/:gameNumber', async (req, res) => {
    try {
        const gameNumber = req.params.gameNumber;

        // Delete rounds related to the game
        await Round.deleteMany({ game: gameNumber });

        // Delete game
        const deletedGame = await Game.findOneAndDelete({ gameNumber: gameNumber });

        if (!deletedGame) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.status(200).json({ message: `Game ${gameNumber} and related rounds deleted` });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// update round
router.put('/:gameNumber/rounds/:roundNumber', async (req, res) => {
    try {
        const { gameNumber, roundNumber } = req.params;
        const { pokemon, roundType, players, readyPlayers } = req.body;

        const game = await Game.findOne({ gameNumber });
        if (!game) {
            return res.status(404).json({ msg: 'Game not found' });
        }

        const round = await Round.findOneAndUpdate(
            { game: game._id, roundNumber },
            { pokemon, roundType, players, readyPlayers },
            { new: true }
        );
        if (!round) {
            return res.status(404).json({ msg: 'Round not found' });
        }

        res.json({
            gameNumber: game.gameNumber,
            roundNumber: round.roundNumber,
            pokemon: round.pokemon,
            roundType: round.roundType,
            players: round.players,
            readyPlayers: round.readyPlayers
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// gets all rounds from a game
router.get('/:gameNumber/rounds', async (req, res) => {
    try {
        const { gameNumber } = req.params;

        const rounds = await Round.find({ gameNumber });
        if (!rounds) {
            return res.status(404).json({ msg: 'Rounds not found in game #' + gameNumber });
        }

        res.status(200).json(rounds);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error => ' + err);
    }
});

module.exports = router;