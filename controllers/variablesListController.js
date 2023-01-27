const VariablesList = require('../models/variablesList')

const async = require("async")

require('dotenv').config()


exports.variables_list_post = (req,res,next) =>{
  console.log(req.body);
  VariablesList.findOneAndUpdate({username: req.body.username, listIndex: req.body.listIndex},
    { $set: req.body }, {new:true, upsert:true}, (err,doc)=>{
    
    if (err) {
      return res.json({error: err})
    } else {
      res.json({updated: doc})
    }
  })
}

exports.variables_list_get = (req,res,next) =>{
  console.log(req.query.username);
  VariablesList.find({username: req.query.username}).sort({listIndex:1}).exec((err, result) => {
    if(err) {
      return res.json({errors: err});
    }
    
    res.json({listVariables: result})
  })
}

exports.variables_list_delete = (req,res,next) => {
  VariablesList.findOneAndRemove({username: req.body.username, listIndex: req.body.listIndex}, (err,doc)=>{
    if (err) {
      return res.json({error: err})
    } else {
      res.json({updated: doc})
    }
  })
}