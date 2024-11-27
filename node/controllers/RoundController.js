const express = require('express');
const router = express.Router();
const Round = require('../models/Round');
const Player = require('../models/Player');
const PlayerResults = require('../models/PlayerResults');
const Game = require('../models/Game');

// Get all rounds for a specific game
router.get('/:gameNumber', async (req, res) => {
    try {
        const { gameNumber } = req.params;

        const game = await Game.findOne({ gameNumber });
        if (!game) {
            return res.status(404).json({ msg: `Game #${gameNumber} not found` });
        }

        const rounds = await Round.find({ gameId: game._id });
        if (!rounds.length) {
            return res.status(404).json({ msg: `No rounds found for game #${gameNumber}` });
        }

        res.status(200).json(rounds);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// Create a new round
router.post('/', async (req, res) => {
    try {
        const { gameNumber, pokemonNames } = req.body;

        // Find the game
        const game = await Game.findOne({ gameNumber });
        if (!game) {
            return res.status(404).json({ msg: 'Game not found' });
        }

        // Determine the new round ID
        const lastRound = await Round.findOne({ gameId: game._id }).sort({ roundId: -1 });
        const nextRoundId = lastRound ? lastRound.roundId + 1 : 1;

        const newRound = new Round({
            roundId: nextRoundId,
            gameId: game._id,
            pokemonNames,
        });

        const savedRound = await newRound.save();
        res.status(201).json(savedRound);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// Add player result to a round
router.post('/:gameNumber/:roundId/playerresult', async (req, res) => {
    try {
        const { gameNumber, roundId } = req.params;
        const { playerName, nextRound } = req.body;

        // 1. Find the game by game number
        const game = await Game.findOne({ gameNumber });
        if (!game) {
            return res.status(404).json({ msg: `Game not found with number ${gameNumber}` });
        }

        // 2. Find the round by roundId and make sure it belongs to the game
        const round = await Round.findOne({ roundId, gameId: game._id });
        if (!round) {
            return res.status(404).json({ msg: `Round not found for game ${gameNumber}` });
        }

        // 3. Find the player by their name
        const player = await Player.findOne({ name: playerName });
        if (!player) {
            return res.status(404).json({ msg: `Player ${playerName} not found` });
        }

        // 4. Create the PlayerResults document
        const newPlayerResult = new PlayerResults({
            player: player._id,
            round: round._id,
            nextRound: nextRound,  // This could be true or false depending on the input
        });

        // 5. Save the player result to the database
        const savedPlayerResult = await newPlayerResult.save();

        res.status(201).json({ msg: 'Player result added successfully', playerResult: savedPlayerResult });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});


// Delete all player results for a round
router.delete('/:roundId', async (req, res) => {
    try {
        const { roundId } = req.params;

        const round = await Round.findOne({ roundId });
        if (!round) {
            return res.status(404).json({ msg: 'Round not found' });
        }

        await PlayerResults.deleteMany({ round: round._id });
        res.status(200).json({ msg: 'All player results for the round deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// Delete a round
router.delete('/:gameNumber/round/:roundId', async (req, res) => {
    try {
        const { gameNumber, roundId } = req.params;

        // Find the game by gameNumber
        const game = await Game.findOne({ gameNumber });
        if (!game) {
            return res.status(404).json({ msg: `Game #${gameNumber} not found` });
        }

        // Find the round by roundId and gameId
        const round = await Round.findOne({ gameId: game._id, roundId });
        if (!round) {
            return res.status(404).json({ msg: `Round #${roundId} not found in game #${gameNumber}` });
        }

        // Delete the round
        await Round.findByIdAndDelete(round._id);

        // Respond with a success message
        res.status(200).json({ msg: `Round #${roundId} deleted from game #${gameNumber}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

module.exports = router;
