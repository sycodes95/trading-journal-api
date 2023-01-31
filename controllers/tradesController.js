const Users = require('../models/users')

const Trades = require('../models/trades')

const async = require("async")

const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs")

const { check, body, validationResult } = require("express-validator");

const jwt = require('jsonwebtoken');
const { json } = require('express');

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
  console.log(req.body);
  Trades.findOneAndUpdate({username: req.body.username, _id: req.body._id},
    { $set: req.body }, {new:true, upsert:true}, (err,doc)=>{
    
    if (err) {
      return res.json({error: err})
    } else {
      res.json({updated: doc})
    }
  })
}

exports.trades_get = (req,res,next) =>{
  console.log(req.query.username);
  Trades.find({username: req.query.username}).sort({entrydate:-1}).exec((err, result) =>{
    if(err) {
      return res.json({error: err});
    }
    
    res.json({trades: result})
  })
  
    
}

exports.trade_delete = (req,res,next) =>{
  
  Trades.findByIdAndRemove({_id: req.body._id}, (err,docs) =>{
    if(err){
      return res.json({error:err})
    }
    res.json({deleted: docs})
  })
    
}
/*
exports.trades_search = (req,res,next)=>{
  console.log(req.query.username);
  console.log(req.query.username);
  Trades.find({username: req.query.username, $text: { $search: req.query.searchInput.toLowerCase()}})
  .then(results =>{
    res.json(results)
  })
  .catch(err =>{
    console.error(err);
    res.status(500).json({message: "Server Error"});
  })
}
*/
exports.trades_search = (req,res,next)=>{
  
  console.log(req.query);
  
  Trades.find({ 
    username: req.query.username,
    $or: [
      {variables: { $regex: req.query.searchInput, $options: 'i' }},
      {setup: { $regex: req.query.searchInput, $options: 'i' }},
      
    ]
    
    /*
    $or: [
      
      
      {instrument: { $regex: req.query.searchInput, $options: 'i' }},
      {setup: { $regex: req.query.searchInput, $options: 'i' }},
      {position: { $regex: req.query.searchInput, $options: 'i' }},
      {plannedentry: { $eq: req.query.searchInput, $options: 'i' }},
      {entry: { $eq: req.query.searchInput, $options: 'i' }},
      {tp: { $eq: req.query.searchInput, $options: 'i' }},
      {sl: { $eq: req.query.searchInput, $options: 'i' }},
      
      {exit: { $eq: req.query.searchInput, $options: 'i' }},
      {mfe: { $eq: req.query.searchInput, $options: 'i' }},
      {mae: { $eq: req.query.searchInput, $options: 'i' }},
      {fgl: { $eq: req.query.searchInput, $options: 'i' }},
      {fees: { $eq: req.query.searchInput, $options: 'i' }},
      {variables: { $regex: req.query.searchInput, $options: 'i' }},
      {comments: { $regex: req.query.searchInput, $options: 'i' }},
      {tv: { $regex: req.query.searchInput, $options: 'i' }},
    ],
    */
    
  }).exec((err, result)=>{
    if(err){
      return res.json({error:err})
    }
    res.json({result})
  })
  
}
