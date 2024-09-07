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

    shoulders: {
        type: Number,
        required: true
    },
    
    height: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    // bodyTypes: {
    //     type: [String],  // Array to store all detected body types
    // },

    finalBodyType: {
        type: String
    }
});

const Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;
