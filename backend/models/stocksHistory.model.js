const mongoose = require('mongoose');

const StockHistorySchema = mongoose.Schema({
    symbol: {type: String},
    history: [{
        Date: String,
        Open: String,
        High: String,
        Low: String,
        Close: String,
        "Adj Close": String,
        Volume: String
    }]
});

const stockshistory = mongoose.model('stockshistories', StockHistorySchema);
module.exports = stockshistory;