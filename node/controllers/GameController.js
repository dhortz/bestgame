const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Round = require('../models/Round');
const Player = require('../models/Player');
const PlayerResults = require('../models/PlayerResults');

// List all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find().populate('players');
        res.status(200).json(games);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// Start a new game
router.post('/newgame', async (req, res) => {
    try {
        const gameNumber = (await Game.countDocuments()) + 1;

        // Create the new game document
        const newGame = new Game({
            gameNumber,
            startDate: new Date(),
            players: [],
            winner: null,
        });

        const savedGame = await newGame.save();

        // Ensure pokemonNames is part of the request body
        if (!req.body.pokemonNames || !Array.isArray(req.body.pokemonNames)) {
            return res.status(400).json({ msg: 'pokemonNames is required and should be an array' });
        }

        // Create the new round with the pokemonNames
        const newRound = new Round({
            gameId: savedGame._id,
            roundId: 1, // assuming it's the first round
            pokemonNames: req.body.pokemonNames,
        });

        const savedRound = await newRound.save();

        // Return the game and round details
        res.status(201).json({
            game: savedGame,
            firstRound: savedRound
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});


// Delete all games
router.delete('/', async (req, res) => {
    try {
        await PlayerResults.deleteMany({});
        await Round.deleteMany({});
        await Game.deleteMany({});

        res.status(200).json({ msg: 'All games, rounds, and player results deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// Delete a specific game
router.delete('/:gameNumber', async (req, res) => {
    try {
        const { gameNumber } = req.params;

        const game = await Game.findOneAndDelete({ gameNumber });
        if (!game) {
            return res.status(404).json({ msg: `Game #${gameNumber} not found` });
        }

        await Round.deleteMany({ gameId: game._id });
        await PlayerResults.deleteMany({ round: { $in: game.rounds } });

        res.status(200).json({ msg: `Game #${gameNumber} and associated data deleted` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// Get game details with rounds and results
router.get('/:gameNumber/details', async (req, res) => {
    try {
        const { gameNumber } = req.params;

        const game = await Game.findOne({ gameNumber }).populate('players');
        if (!game) {
            return res.status(404).json({ msg: `Game #${gameNumber} not found` });
        }

        const rounds = await Round.find({ gameId: game._id });

        // Fetch the player results from all rounds in the game
        const playerResults = await PlayerResults.find({ round: { $in: rounds.map((r) => r._id) } }).populate('player round');

        // Calculate results for each player
        const resultsByPlayer = game.players.map((player) => {
            const playerResultsForGame = playerResults.filter((res) => res.player._id.equals(player._id));

            // Calculate the total points for the player by summing roundPoints
            const totalPoints = playerResultsForGame.reduce((sum, res) => sum + (res.roundPoints || 0), 0);

            return {
                player: player.name,
                totalPoints,
                rounds: playerResultsForGame.map((res) => ({
                    roundId: res.round.roundId,
                    pokemonResults: res.pokemonResults,
                    roundPoints: res.roundPoints, // Include the points for the round
                })),
            };
        });

        res.status(200).json({ game, rounds, playerResults: resultsByPlayer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});


// Add a player to a game
router.patch('/:gameNumber/player', async (req, res) => {
    try {
        const { gameNumber } = req.params;
        const { playerName } = req.body;

        const game = await Game.findOne({ gameNumber });
        if (!game) {
            return res.status(404).json({ msg: `Game #${gameNumber} not found` });
        }

        let player = await Player.findOne({ name: playerName });
        if (!player) {
            player = new Player({ name: playerName, gamesWon: 0 });
            await player.save();
        }

        if (game.players.includes(player._id)) {
            return res.status(400).json({ msg: 'Player is already in the game' });
        }

        game.players.push(player._id);
        await game.save();

        res.status(201).json({ msg: 'Player added to the game', game });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// last round -> end the game
router.patch('/:gameNumber/endgame', async (req, res) => {
    try {
        const { gameNumber } = req.params;

        // Find the game by gameNumber
        const game = await Game.findOne({ gameNumber });

        if (!game) {
            return res.status(404).json({ msg: 'Game not found with number ' + gameNumber });
        }

        // Retrieve all rounds for the game
        const rounds = await Round.find({ gameId: game._id });

        if (!rounds || rounds.length === 0) {
            return res.status(404).json({ msg: 'No rounds found for this game' });
        }

        // Retrieve all PlayerResults for the rounds in this game
        const playerResultsForGame = await PlayerResults.find({ round: { $in: rounds.map(r => r._id) } }).populate('player');

        if (!playerResultsForGame || playerResultsForGame.length === 0) {
            return res.status(404).json({ msg: 'No player results found for this game' });
        }

        // Count how many rounds each player participated in
        const participationCounts = {};
        playerResultsForGame.forEach(result => {
            const playerId = result.player._id.toString();
            if (!participationCounts[playerId]) {
                participationCounts[playerId] = 0;
            }
            participationCounts[playerId]++;
        });

        // Find the player with the highest participation
        const maxParticipationPlayerId = Object.keys(participationCounts).reduce((maxId, playerId) =>
            participationCounts[playerId] > (participationCounts[maxId] || 0) ? playerId : maxId
        );

        // Update the game with the winner
        game.winner = maxParticipationPlayerId;
        await game.save();

        // Update the winner's gamesWon count
        const winner = await Player.findById(maxParticipationPlayerId);
        if (winner) {
            winner.gamesWon += 1;
            await winner.save();
        }

        res.status(200).json({
            gameNumber: game.gameNumber,
            winner: winner.name,
            participationCounts,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error => ' + err);
    }
});


// Get current game and round
router.get('/currentgame', async (req, res) => {
    try {
        // Find the latest game
        const currentGame = await Game.findOne().sort({ startDate: -1 }).populate('players');

        if (!currentGame) {
            return res.status(404).json({ msg: 'No games found' });
        }

        // Find the latest round of the latest game
        const currentRound = await Round.findOne({ gameId: currentGame._id })
            .sort({ roundId: -1 }) // Get the most recent round
            .limit(1); // Ensure we only get one round

        if (!currentRound) {
            return res.status(404).json({ msg: 'No rounds found for the latest game' });
        }

        // Include pokemonNames in the response
        res.status(200).json({ currentGame, currentRound: { ...currentRound.toObject(), pokemonNames: currentRound.pokemonNames } });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error => ' + err);
    }
});


module.exports = router;
