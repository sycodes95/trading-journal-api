const Users = require('../models/users')

const Trades = require('../models/trades')

const async = require("async")

const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs")

const { check, body, validationResult } = require("express-validator");

const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.new_trade_post = (req,res,next) =>{

  const trade = new Trades({

    username: req.body.username,
    open: req.body.open,
    entrydate: req.body.entrydate,
    instrument: req.body.instrument,
    setup: req.body.setup,
    position: req.body.position,
    plannedentry: req.body.plannedentry,
    entry: req.body.entry,
    tp: req.body.tp,
    sl: req.body.sl,
    exitdate: req.body.exitdate,
    exit: req.body.exitprice,
    mfe: req.body.mfe,
    mae: req.body.mae,
    fgl: req.body.fgl,
    fees: req.body.fees,
    comments: req.body.comments,
    tv: req.body.tv,
    variables: req.body.variables,
    public: req.body.public,

  }).save((err, result) => {
    if (err) {
      return res.json({error: err});
    }
    res.json({trade: result});
        console.log(trade);
  });
}

exports.trade_post = (req,res,next) =>{

  Trades.findOneAndUpdate({username: req.body.username, _id: req.body.id},
    { $set: req.body }, {new:true, upsert:true}, (err,doc)=>{
    
    if (err) {
      return res.json({error: err})
    } else {
      res.json({updated: doc})
    }
  })
}

exports.trades_get = (req,res,next) =>{

  Trades.find({username: req.query.username}).sort({entrydate:-1}).exec((err, result) =>{
    if(err) {
      return res.json({error: err});
    }
    
    res.json({trades: result})
  })
  
    
}