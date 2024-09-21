const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const measurementSchema = new Schema({
    bust: {
        type: Number,
        required: true
    },

    waist: {
        type: Number,
        required: true
    },
    
    hip: {
        type: Number,
        required: true
    },

    bodyType: {
        type: String
    }
});

const Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;
