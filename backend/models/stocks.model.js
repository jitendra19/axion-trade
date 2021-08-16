const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    symbol: {type: String},
    name: {type: String},
    exch: {type: String},
    type: {type: String},
    exchDisp: {type: String},
    typeDisp: {type: String}
});

const Stock = mongoose.model('stock', StockSchema);
module.exports = Stock;