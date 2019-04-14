var mongoose = require('mongoose');

//mongoose.connect('mongodb://127.0.0.1/db_netsp');

mongoose.connect('mongodb://link-db/db_netsp');

PersonSchema = require('../models/person');

var Person = mongoose.model('Person', PersonSchema);
module.exports = Person;

