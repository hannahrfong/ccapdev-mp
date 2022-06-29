var mongoose = require('mongoose');
var BestSellerSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    }
});
module.exports = mongoose.model('BestSeller', BestSellerSchema);
