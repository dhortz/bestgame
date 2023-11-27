const express = require('express');
const router = express.Router();

const Player = require('../models/Player');
const Game = require('../models/Game');

// adds a new player
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const player = new Player({
            name,
            gamesWon: 0
        });
        const savedPlayer = await player.save();
        res.status(201).json(savedPlayer);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error =>', err);
    }
});

// get all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find({});
        res.status(200).json(players);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// update games won by player
router.put('/:playerName/won', async (req, res) => {
    try {
        const { playerName } = req.params;
        const player = await Player.findOneAndUpdate(
            { name: playerName },
            { gamesWon: gamesWon++ }
        );

        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        res.status(200).json(player);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// delete all players
router.delete('/', async (req, res) => {
    try {
        await Player.deleteMany();
        res.status(200).send("All players deleted");
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// delete player by name
router.delete('/:playerName', async (req, res) => {
    try {
        const { playerName } = req.params;
        const deletedPlayer = await Player.findOneAndDelete({ name: playerName });

        if (!deletedPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }

        res.status(200).json({ message: `Player ${name} deleted` });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Endpoint to get players who have won games with game details
router.get('/winners', async (req, res) => {
    try {
        // Find games where there is a winner
        const gamesWithWinners = await Game.find({ winner: { $exists: true } }).populate('winner');

        // Extract the winners from the games
        const winners = gamesWithWinners.map(game => game.winner);

        res.status(200).json(winners);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error => ' + err);
    }
});

module.exports = router;
