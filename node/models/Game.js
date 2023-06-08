const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    gameNumber: {
        type: Number,
        required: true,
        unique: true
    },
    roundsPlayed: {
        type: Number,
        default: 0
    },
    playersParticipated: {
        type: Number,
        default: 0
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref: 'Player'
    },
    beginDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Game', gameSchema);