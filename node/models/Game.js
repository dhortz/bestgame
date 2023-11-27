const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    gameNumber: {
        type: Number,
        required: true,
        unique: true
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }],
    winner: {
        type: Schema.Types.ObjectId,
        ref: 'Player'
    },
    beginDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Game', gameSchema);