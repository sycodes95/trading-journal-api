const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const TradingRules = new Schema({
  username: {type: String, required: true, maxlength: 50},
  rules: {type: Array, required:true}
}, { timestamps:true })


module.exports = mongoose.model('TradingRules', TradingRules) 