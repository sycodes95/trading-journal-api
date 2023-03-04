const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const VariablesArchive = new Schema({
  username: {type: String, required: true, index:true, maxlength: 50},
  title: {type: String, required:true, index:true, maxlength :69, },
  variables: {type: Array, required:true, index:true},
  date: {type: Date, required: true, index:true}
}, {timestamps: true})


module.exports = mongoose.model('VariablesArchives', VariablesArchive) 