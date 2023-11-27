const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roundSchema = new Schema({
    roundId: {
        type: Number,
        required: true,
        unique: true
    },
    gameId: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    day: {
        type: String,
        required: true
    },
    week: {
        type: String,
        required: true
    },
    pokemonNames: [String],
});

module.exports = mongoose.model('Round', roundSchema);