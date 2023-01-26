const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const VariablesList = new Schema({
  username: {type: String, required: true, index:true, maxlength: 50},
  title: {type: String, required:true, index:true, maxlength :69, },
  variables: {type: Array, required:true, index:true},
  listIndex: {type: Number, required:true, index:true, unique:true}
})


module.exports = mongoose.model('VariablesLists', VariablesList) 