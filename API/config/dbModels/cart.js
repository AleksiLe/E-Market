const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: {
        type: Map,
        of: Number,
        default: {} 
    }
});

module.exports = mongoose.model('Cart', cartSchema);