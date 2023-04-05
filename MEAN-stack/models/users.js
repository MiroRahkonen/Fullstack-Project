const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    notes: [{
        time: {type: String},
        message: {type: String}
    }]
})

module.exports = mongoose.model('users',UserSchema);