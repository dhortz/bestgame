const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Results = require('../models/Results');

// gets all rounds from a game
router.get('/:gameNumber', async (req, res) => {
    try {
        const { gameNumber } = req.params;

        const results = await Results.find({ gameNumber });
        if (!results) {
            return res.status(404).json({ msg: 'Results not found in game #' + gameNumber });
        }

        res.status(200).json(results);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error => ' + err);
    }
});

module.exports = router;