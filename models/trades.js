const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const TradesSchema = new Schema({
  username: {type: String, required: true, maxlength: 50},
  open: {type: Boolean, required: true, default:true},
  entrydate: {type: Date, required: true},
  instrument: {type: String, required: true, index: true},
  setup: {type: String, required: true, index: true},
  position: {type: String, required: true, index: true},
  plannedentry: {type: Number},
  entry: {type: Number, required: true},
  tp: {type: Number},
  sl: {type: Number},
  exitdate: {type: Date},
  exit: {type: Number},
  mfe: {type: Number},
  mae: {type: Number},
  fgl: {type: Number},
  fees: {type: Number},
  comments: {type: String},
  tv: {type: String},
  variables: {type: Array},
  public: {type: Boolean, default: false},
}, { timestamps:true })

const index = {};
Object.keys(TradesSchema.obj).forEach(field => {
  index[field] = "text";
});
TradesSchema.index(index, {collation: {locale: "en_US", strength: 1}});


module.exports = mongoose.model('Trades', TradesSchema) 