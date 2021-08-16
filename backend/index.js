const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const stock = require('./models/stocks.model.js');
const stockshistory = require('./models/stocksHistory.model');

const url = 'mongodb+srv://mongodb:mongodb@cluster0.v9oir.mongodb.net/sample_stocks?retryWrites=true&w=majority';

mongoose.set('debug', true);
mongoose.connect(url, {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true 
});
mongoose.connection.on('connected', ()=> {
    console.log('connected with DB');
});
mongoose.connection.on('error', (error)=> {
    console.log('error - ', error);
});


const port = 2100;

app.get('/', (req, res)=>{
    res.send('hello baba');
});
app.get('/foo', (req, res)=>{
    res.send('hello foo');
});

app.get('/api/stocks', (req, res)=>{
    console.log(req.query);
    stock.find({symbol: {$regex: '.*(?i)' + req.query.input + '(?-i).*'}}).exec(function(err, doc) {
        res.json(doc);
    });
});

app.get('/api/history', (req, res)=>{
    if(req.query && !req.query.symbol) {
        res.send('No symbole is provided from Client! :-)');
        return;
    }
    console.log(req.query);
    stockshistory.find({symbol: req.query.symbol.toLowerCase()}).lean().exec(function(err, doc) {
        res.json(doc);
    });
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.listen(port, ()=>{
    console.log('listening you on', port);
});
