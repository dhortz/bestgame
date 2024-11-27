const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerResultSchema = new Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
    },
    round: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Round',
        required: true,
    },
    nextRound: {
        type: Boolean,
    }
});

module.exports = mongoose.model('PlayerResults', playerResultSchema);