const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    brand: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);