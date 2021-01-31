require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');

// var mongoDB = 'mongodb://127.0.0.1/my_database';
// mongoose.connect(mongoDB)

//define modules we use
const DogModel = require('./model/dog');

var dogName = "Jimothy";
var picture = "https://scontent-lga3-2.xx.fbcdn.net/v/t1.0-9/47682288_1961732107466121_2171353353949282304_o.jpg?_nc_cat=109&ccb=2&_nc_sid=cdbe9c&_nc_ohc=1sf-AEUnVuIAX-I71dT&_nc_ht=scontent-lga3-2.xx&oh=946586978b26337da06cdafac2b45c95&oe=6039BCB9";


const app = express();

app.use(bodyParser.json());

app.set("views", path.join(__dirname,"/views/"));

app.use(express.static(path.join(__dirname, 'client')));
app.set('view engine', 'ejs');
app.set('view engine', 'hbs');

app.set("views", path.join(__dirname,"/views"));

app.get('/',function(req, res) {
    var tempsession = req.session;
    // res.sendFile(path.join(__dirname, './views/index.html'));
    res.render("main-page.ejs",{
        dogName: dogName,
        picture: picture
    });
});

const uri = "mongodb+srv://ethanUser:ethanPassword@cluster0.58itw.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB Connected!');
})
.catch(err => console.log(err));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// .toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
// });

var DogSchema = mongoose.Schema({
    dogName: String,
    picture: String
});

var dogM = mongoose.model('dogM', DogSchema, 'dogs');


setInterval(function() {db.collection("dogs").findOne({}, function(err, result){
    if (err) throw err;
    console.log(result.dogName);
    dogName = result.dogName;
    picture = result.picture;

    var dog = new dogM({ dogName: dogName, picture: picture});
    dog.save(function (err, dogM){
        if (err) return console.error(err);
        console.log('hopefully saved!');
    });
})}, 8000);

setInterval(function() {db.collection("dogs").findOneAndDelete({}, function(err, result){
    if (err) throw err;
    console.log(result.dogName)
})}, 8000);




// function(err, db) {
//     if (err) throw err;
//     var dogdb = db.db("test");
//     dogdb.collection("dogs").findOne({}, function(err, result){
//         if (err) throw err;
//         console.log(result.dogName);
//         dogName = result.dogName;
//         picture = result.picture;
//     });


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://ethanUser:ethanPassword@cluster0.58itw.mongodb.net/dogs-and-daily-reminders?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// var first_instance = new DogModel({
//     dogName: 'Finn',
//     picture: 'https://scontent-lga3-2.xx.fbcdn.net/v/t1.0-9/33994826_10212553022881579_5701784890366754816_o.jpg?_nc_cat=103&ccb=2&_nc_sid=730e14&_nc_ohc=P2N50s9Rt6QAX_gLw5D&_nc_ht=scontent-lga3-2.xx&oh=9ba0d1368c5162e9d94119a55cd8b340&oe=6039C129'
// });

// first_instance.save(function (err){
//     if (err) return handleError(err);
// });

app.listen(port);