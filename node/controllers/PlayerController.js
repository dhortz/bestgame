const express = require('express');
const router = express.Router();

const Player = require('../models/Player');

// adds a new player
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const player = new Player({
            name,
            gamesWon: 0,
            mostRounds: 0,
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

// update player ready for next round status
router.put('/:playerId/readyForNextRound', async (req, res) => {
    try {
        const { playerId } = req.params;
        const player = await Player.findByIdAndUpdate(
            playerId,
            { readyForNextRound: true },
            { new: true }
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

module.exports = router;
