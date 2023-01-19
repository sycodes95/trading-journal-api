const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  firstname: {type: String, required: true, maxlength: 50},
  lastname: {type: String, required: true, maxlength: 50},
  username: {type: String, required: true, maxlength: 50, unique: true, index:true},
  password: {type: String, required: true},
  membership: {type: Boolean, default: false},
  admin: {type:Boolean, default:false}
})


module.exports = mongoose.model('Users', UsersSchema)