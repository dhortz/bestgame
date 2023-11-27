const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Round = require('../models/Round');
const Player = require('../models/Player');
const PlayerResults = require('../models/PlayerResults');

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

        const newRound = {
            gameId: savedGame._id,
            roundId: await Round.countDocuments() + 1,
            day: "Monday",
            week: 1,
            pokemonNames: req.body.pokemon
        };
        const savedRound = await Round.create(newRound);

        res.status(201).json({
            gameNumber: savedGame.gameNumber,
            round: savedRound,
            pokemon: savedRound.pokemonNames
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
        await Round.deleteMany({});

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
        await Round.deleteMany({ game: gameNumber });

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

// get information about a game, its rounds, and player results
router.get('/:gameNumber/details', async (req, res) => {
    try {
        const { gameNumber } = req.params;

        
        const game = await Game.findOne({ gameNumber })

        if (!game) {
            return res.status(404).json({ msg: 'Game not found with number ' + gameNumber });
        }

        const rounds = await Round.find({ gameId: game._id });
        
        // Manually populate playerResults
        const populatedResults = await Promise.all(rounds.map(async (round) => {
            const playerResults = await PlayerResults.find({ round: round._id }).populate('player');
            return { ...round.toObject(), playerResults };
        }));

        // Attach the populated results to the gameDetails object
        const gameDetailsWithPopulatedResults = { ...game.toObject(), results: populatedResults };

        res.status(200).json(gameDetailsWithPopulatedResults);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error => ' + err);
    }
});

// add player to game
router.patch('/:gameNumber/player', async (req, res) => {
    try {
        const { gameNumber } = req.params;
        const { playerName } = req.body;

        const game = await Game.findOne({ gameNumber })

        if (!game) {
            return res.status(404).json({ msg: 'Game not found with number ' + gameNumber });
        }

        // Check if the player already exists
        let player = await Player.findOne({ name: playerName });

        // If the player does not exist, create a new player
        if (!player) {
            player = new Player({
                name: playerName,
                gamesWon: 0,
            });
            await player.save();
        }
        
        // Add the player's ID to the game's players array
        game.players.push(player._id);

        // Save the updated game
        await game.save();

        res.status(201).json({ msg: 'Player added to the game', player, game });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error => ' + err);
    }
});

module.exports = router;