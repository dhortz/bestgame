const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultsSchema = new Schema({
    resultsId: {
        type: Number,
        required: true,
        unique: true
    },
    gameId: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
    },
    day: {
        type: String,
        required: true
    },
    week: {
        type: String,
        required: true
    },
    playerName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    },
    pokemonNames: [String],
    points: Number,
});

module.exports = mongoose.model('Results', resultsSchema);