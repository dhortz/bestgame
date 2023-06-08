const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roundSchema = new Schema({
    gameId: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
    },
    roundNumber: {
        type: Number,
        required: true
    },
    pokemonDrawn: [{
        type: String,
        required: true,
    }],
    roundType: {
        type: String,
        required: true,
        default: 'Single'
    },
    players: [{
        player: {
            type: Schema.Types.ObjectId,
            ref: 'Player'
        },
        usedHelp: {
            type: Boolean,
            required: true,
            default: false
        },
        isReady: {
            type: Boolean,
            required: true,
            default: false
        },
        isEliminated: {
            type: Boolean,
            required: true,
            default: false
        },
    }]
});

module.exports = mongoose.model('Round', roundSchema);