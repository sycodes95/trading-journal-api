const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const TradesSchema = new Schema({
  username: {type: String, required: true, maxlength: 50},
  open: {type: String, required: true, default:'OPEN'},
  entrydate: {type: Date, required: true},
  entrydateString: {type: String},
  instrument: {type: String, required: true, index: true},
  setup: {type: String, required: true, index: true},
  position: {type: String, required: true, index: true},
  plannedentry: {type: Number},
  plannedentryString: {type: String},
  entry: {type: Number, required: true},
  entryString: {type: String},
  tp: {type: Number},
  tpString: {type: String},
  sl: {type: Number},
  slString: {type: String},
  exitdate: {type: Date},
  exitdateString: {type: String},
  exit: {type: Number},
  exitString: {type: String},
  mfe: {type: Number},
  mfeString: {type: String},
  mae: {type: Number},
  maeString: {type: String},
  fgl: {type: Number},
  fglString: {type: String},
  fees: {type: Number},
  feesString: {type: String},
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