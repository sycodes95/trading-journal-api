const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const TradesSchema = new Schema({
  username: {type: String, required: true, maxlength: 50},
  current: {type: Boolean, required: true, default:true},
  setup: {type: String, required: true, index: true},
  entry: {type: Number, required: true},
  tp: {type: Number},
  sl: {type: Number},
  mfe: {type: Number},
  mae: {type: Number},
  result: {type: Boolean},
  fgl: {type: Number},
  rgl: {type: Number},
  comments: {type: String},
  tv: {type: String},
  public: {type: Boolean, default: false},
}, { timestamps:true })


module.exports = mongoose.model('Trades', TradesSchema) 