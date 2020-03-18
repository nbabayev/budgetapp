var mongoose = require('mongoose');

var Budget = mongoose.model('Budget', {
    category: {
        type: String,
        trim: true
    },
    note: {
        type: String,
        trim: true
    },
    type: {
        type: String 
    },
    amount: {
        type: Number,
        required: true,
        minlength: 1 
    },
});

module.exports = {Budget};
