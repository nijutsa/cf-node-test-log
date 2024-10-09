const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let productSchema = new Schema({
    product: {

    },

    cost: {

    },

    description: {

    },

    quantity: {

    }
},

    {
        collection: 'Products',
        timestamps: true
    }
);

modules.export = mongoose.model('Product', productSchema);