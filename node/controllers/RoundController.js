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
        const { gameNumber, pokemonNames } = req.body;

        // Check if the game exists
        const game = await Game.findOne({ gameNumber });
        if (!game) {
            return res.status(404).json({ msg: 'Game not found' });
        }

        // Find the last round of the game
        const lastRound = await Round.findOne({ gameId: game._id }).sort({ roundId: -1 });

        if (lastRound.day === "Sunday" && lastRound.week === 2) {
            return res.status(500).json({ msg: "Can't add a new round! We're in the last day of the game!" });
        }

        // Calculate the next day and week
        const nextDay = lastRound ? getNextDay(lastRound.day) : 'Monday';
        const nextWeek = lastRound ? getNextWeek(lastRound.week) : '1';

        // Create a new Round document
        const round = new Round({
            roundId: await Round.countDocuments() + 1,
            gameId: game._id,
            day: nextDay,
            week: nextWeek,
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

        const { pokemonResults } = req.body;

        // Find the player by name
        const player = await Player.findOne({ name: playerName });

        // Find the round by round number
        const round = await Round.findOne({ roundId });

        if (!player || !round) {
            return res.status(404).json({ msg: 'Player or round not found' });
        }

        // Calculate roundPoints by summing the points in pokemonResults
        const roundPoints = pokemonResults.reduce((sum, pokemon) => sum + pokemon.points, 0);

        // Create a new PlayerResult document
        const playerResult = new PlayerResults({
            player: player._id,
            round: round._id,
            pokemonResults,
            roundPoints
        });

        // Save the PlayerResult document
        const savedPlayerResult = await playerResult.save();

        res.status(201).json(savedPlayerResult);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error => ' + err);
    }
});

// delete all player results for a specific round
router.delete('/:roundId', async (req, res) => {
    try {
        const { roundId } = req.params;

        const round = await Round.find({ roundId });

        // Delete all PlayerResults for the specified round
        await PlayerResults.deleteMany({ round: round._id });

        res.status(200).json({ msg: 'All PlayerResults for the specified round deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error => ' + err);
    }
});

// Helper function to get the next day (e.g., Monday -> Tuesday)
function getNextDay(currentDay) {
    // Add your logic to determine the next day
    // This can be based on a predefined order or a calendar
    // For simplicity, let's assume a predefined order: Monday -> Tuesday -> ... -> Sunday -> Monday
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const currentIndex = daysOfWeek.indexOf(currentDay);
    const nextIndex = (currentIndex + 1) % daysOfWeek.length;
    return daysOfWeek[nextIndex];
}

// Helper function to get the next week (e.g., '1' -> '2')
function getNextWeek(currentWeek) {
    // Add your logic to determine the next week
    // This can be based on the current week or other criteria
    // For simplicity, let's assume incrementing the current week
    return (parseInt(currentWeek) + 1).toString();
}

module.exports = router;