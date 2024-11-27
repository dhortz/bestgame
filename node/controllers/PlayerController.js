const express = require('express');
const router = express.Router();

const Player = require('../models/Player');
const Game = require('../models/Game');

// Add a new player
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Name is required" });

        const player = new Player({ name, gamesWon: 0 });
        const savedPlayer = await player.save();

        res.status(201).json(savedPlayer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating player', error: err.message });
    }
});

// Get all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find({});
        res.status(200).json(players);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching players', error: err.message });
    }
});

// Update games won by player
router.put('/:playerName/won', async (req, res) => {
    try {
        const { playerName } = req.params;

        const player = await Player.findOneAndUpdate(
            { name: playerName },
            { $inc: { gamesWon: 1 } },
            { new: true }
        );

        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        res.status(200).json(player);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating player', error: err.message });
    }
});

// Delete all players
router.delete('/', async (req, res) => {
    try {
        await Player.deleteMany();
        res.status(200).json({ message: "All players deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting players', error: err.message });
    }
});

// Delete player by name
router.delete('/:playerName', async (req, res) => {
    try {
        const { playerName } = req.params;
        const deletedPlayer = await Player.findOneAndDelete({ name: playerName });

        if (!deletedPlayer) {
            return res.status(404).json({ message: 'Player not found' });
        }

        res.status(200).json({ message: `Player ${deletedPlayer.name} deleted` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting player', error: err.message });
    }
});

// Get players who have won games with game details
router.get('/winners', async (req, res) => {
    try {
        const gamesWithWinners = await Game.find({ winner: { $exists: true } })
            .populate('winner', 'name gamesWon -_id');

        const winners = gamesWithWinners.map(game => ({
            winner: game.winner,
            gameNumber: game.gameNumber
        }));

        res.status(200).json(winners);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching winners', error: err.message });
    }
});

module.exports = router;
