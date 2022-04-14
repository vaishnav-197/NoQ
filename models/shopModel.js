const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    products: [{
        type: Object
    }],
    sales: [{
        type: Object
    }],
    role: {
        type: Number,
        default: 1
    },
})


module.exports = mongoose.model('Shop',shopSchema)