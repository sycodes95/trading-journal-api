const Setups = require('../models/setups')

const Trades = require('../models/trades')

const async = require("async")

const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs")

const { check, body, validationResult } = require("express-validator");

const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.new_setup_post = (req,res,next) =>{

  const setup = new Setups({

    username: req.body.username,
    setup: req.body.setup,
    active: req.body.active 

  }).save((err, result) => {
    if (err) {
      return res.json({errors: err});
    }
    res.json({setup: result});
        console.log(result);
  });
}

exports.setup_get = (req,res,next) =>{
  
  Setups.find({username: req.query.username}).sort({_id:-1}).exec((err, docs) => {
    if(err) {
      return res.json({errors: err});
    }
    console.log(docs);
    res.json({setups: docs})
  })
}
exports.setup_delete = (req,res,next) =>{
  console.log(req.body.id);
  Setups.findByIdAndRemove(req.body.id)
    .then(item =>{
      if(!item) {
        return res.status(404).send({
          message: "Item not found with ID" + req.params.id
        })
      }
      res.json({ message: "Item deleted"})
    }).catch(err =>{
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Item not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete item with id " + req.params.id
      });
    })
}