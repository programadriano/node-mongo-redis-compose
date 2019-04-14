var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
    nome: String,
    foto: String
});

module.exports = PersonSchema;
 