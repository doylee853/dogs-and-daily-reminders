const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DogSchema = new Schema({
    dogName : String,
    picture : String,
});

const Dog = mongoose.model("dog", DogSchema);

module.exports = Dog;