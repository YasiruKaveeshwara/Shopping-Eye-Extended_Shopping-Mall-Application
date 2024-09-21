const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bodyTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imageUrl: [{
        type: String
    }]
});

const BodyType = mongoose.model('BodyType', bodyTypeSchema);

module.exports = BodyType;