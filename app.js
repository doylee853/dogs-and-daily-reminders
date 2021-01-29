const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

const app = express();
app.use(express.static(path.join(__dirname, 'client')));

app.get('/',function(req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

//define modules we use
const DogModel = require('./model/dog')

app.listen(3000);