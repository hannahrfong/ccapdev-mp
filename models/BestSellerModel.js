var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }
});
module.exports = mongoose.model('Product', ProductSchema);
