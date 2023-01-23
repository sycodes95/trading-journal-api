const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Instruments = new Schema({
  username: {type: String, required: true, index:true, maxlength: 50},
  instrument: {type: String, required:true, unique:true, index:true, maxlength :69, },
})

module.exports = mongoose.model('Instruments', Instruments) 