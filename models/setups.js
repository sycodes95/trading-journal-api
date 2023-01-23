const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Setups = new Schema({
  username: {type: String, required: true, index:true, maxlength: 50},
  setup: {type: String, required:true, unique:true, index:true, maxlength :69, },
  active: {type: Boolean}
}, { timestamps:true })


module.exports = mongoose.model('Setups', Setups) 