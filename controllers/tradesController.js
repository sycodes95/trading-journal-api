const Users = require('../models/users')

const Trades = require('../models/trades')

const async = require("async")

const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs")

const { check, body, validationResult } = require("express-validator");

const jwt = require('jsonwebtoken');
const { json } = require('express');
const tradingRules = require('../models/tradingRules');

require('dotenv').config()

exports.new_trade_post = (req,res,next) =>{

  const trade = new Trades({

    username: req.body.username,
    open: req.body.open,
    entrydate: req.body.entrydate,
    entrydateString: req.body.entrydate,
    instrument: req.body.instrument,
    setup: req.body.setup,
    position: req.body.position,
    plannedentry: req.body.plannedentry,
    plannedentryString: req.body.plannedentry,
    entry: req.body.entry,
    entryString: req.body.entry,
    tp: req.body.tp,
    tpString: req.body.tp,
    sl: req.body.sl,
    slString: req.body.sl,
    exitdate: req.body.exitdate,
    exitdateString: req.body.exitdate,
    exit: req.body.exit,
    exitString: req.body.exit,
    mfe: req.body.mfe,
    mfeString: req.body.mfe,
    mae: req.body.mae,
    maeString: req.body.mae,
    fgl: req.body.fgl,
    fglString: req.body.fgl,
    fees: req.body.fees,
    feesString: req.body.fees,
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
    { $set: 
      {
      username: req.body.username,
      open: req.body.open,
      entrydate: req.body.entrydate,
      entrydateString: req.body.entrydate,
      instrument: req.body.instrument,
      setup: req.body.setup,
      position: req.body.position,
      plannedentry: req.body.plannedentry,
      plannedentryString: req.body.plannedentry,
      entry: req.body.entry,
      entryString: req.body.entry,
      tp: req.body.tp,
      tpString: req.body.tp,
      sl: req.body.sl,
      slString: req.body.sl,
      exitdate: req.body.exitdate,
      exitdateString: req.body.exitdate,
      exit: req.body.exit,
      exitString: req.body.exit,
      mfe: req.body.mfe,
      mfeString: req.body.mfe,
      mae: req.body.mae,
      maeString: req.body.mae,
      fgl: req.body.fgl,
      fglString: req.body.fgl,
      fees: req.body.fees,
      feesString: req.body.fees,
      comments: req.body.comments,
      tv: req.body.tv,
      variables: req.body.variables,
      public: req.body.public,
      }  
    },
    {new:true, upsert:true}, (err,doc)=>{
    
    if (err) {
      return res.json({error: err})
    } else {
      res.json({updated: doc})
    }
  })
}

exports.trades_get = (req,res,next) =>{
  Trades.countDocuments({username: req.query.username})
  .exec((err, count) =>{
    if(err) {
      return res.json({error: err});
    }
    
    Trades.find({username: req.query.username})
    .sort({entrydate:-1})
    .limit(req.query.limit)
    .skip(req.query.skip)
    .exec((err, result) =>{
      if(err) {
        return res.json({error: err});
      }
      
      res.json({trades: result, count})
    })
  })
  
  console.log(req.query.username);
    
}

exports.trades_get_month = (req,res,next) =>{
  const date = new Date();
  const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
  
  Trades.countDocuments({username: req.query.username})
  .exec((err, count) =>{
    if(err) {
      return res.json({error: err});
    }
    
    Trades.find({username: req.query.username, entrydate: { $gte: lastMonth, $lte: date}})
    .sort({entrydate:-1})
    .exec((err, result) =>{
      if(err) {
        return res.json({error: err});
      }
      
      res.json({trades: result, count})
    })
  })
}

exports.trades_get_week = (req,res,next) =>{
  const date = new Date();
  const lastWeek = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate() - 7);
  
  Trades.countDocuments({username: req.query.username})
  .exec((err, count) =>{
    if(err) {
      return res.json({error: err});
    }
    Trades.find({username: req.query.username, entrydate: { $gte: lastWeek, $lte: date}})
    .sort({entrydate:-1})
    .exec((err, result) =>{
      if(err) {
        return res.json({error: err});
      }
      
      res.json({trades: result, count})
    })
  })
}
/*
exports.trades_count = (req,res,next) =>{
  Trades.countDocuments({username: req.query.username}).exec((err, docs) =>{
    if(err) {
      return res.json({error: err});
    }
    
    res.json({docs})
  })
}
*/

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

exports.trade_sort_get = (req,res,next) =>{
  console.log(req.query.field);
  console.log(req.query.sortBy);
  
  const field = req.query.field
  const sortBy = parseInt(req.query.sortBy)

  Trades.countDocuments({username: req.query.username})
  .exec((err, count) =>{
    if(err) {
      return res.json({error: err});
    }
    
    Trades.find({username: req.query.username})
    .sort({[field]: sortBy })
    .limit(req.query.limit)
    .skip(req.query.skip)
    .exec((err, result) =>{
      if(err) {
        return res.json({error: err});
      }
      
      res.json({trades: result, count})
    })
  })
}

exports.trades_search_variables = (req, res, next) =>{
  
  console.log(req.query.searchInputVariable);
  Trades.find({
    username: req.query.username,
    variables: {$elemMatch: {title : req.query.searchInputTitle, variable:req.query.searchInputVariable}}
  }).exec((err, trades) =>{
    if(err){
      return res.json({error:err})
    }
    res.json({trades})
  })
}

exports.trades_search = (req,res,next)=>{
  
  console.log(req.query);
  Trades.countDocuments({ 
    username: req.query.username,
    $or: [
      {open: { $regex: req.query.searchInput, $options: 'i'}},
      {entrydateString: { $regex: req.query.searchInput, $options: 'i'}},
      {instrument: { $regex: req.query.searchInput, $options: 'i' }},
      {setup: { $regex: req.query.searchInput, $options: 'i' }},
      {position: { $regex: req.query.searchInput, $options: 'i' }},
      {plannedentryString: { $regex: req.query.searchInput, $options: 'i' }},
      {entryString: { $regex: req.query.searchInput, $options: 'i' }},
      {tpString: { $regex: req.query.searchInput, $options: 'i' }},
      {slString: { $regex: req.query.searchInput, $options: 'i' }},
      {exitdateString: { $regex: req.query.searchInput, $options: 'i' }},
      {exitString: { $regex: req.query.searchInput, $options: 'i' }},
      {mfeString: { $regex: req.query.searchInput, $options: 'i' }},
      {maeString: { $regex: req.query.searchInput, $options: 'i' }},
      {fglString: { $regex: req.query.searchInput, $options: 'i' }},
      {feesString: { $regex: req.query.searchInput, $options: 'i' }},
      {variables: { $regex: req.query.searchInput, $options: 'i' }},
      {comments: { $regex: req.query.searchInput, $options: 'i' }},
      {tv: { $regex: req.query.searchInput, $options: 'i' }},
    ],
    
    
  })
  .exec((err, count)=>{
    if(err){
      return res.json({error:err})
    }
    Trades.find({ 
      username: req.query.username,
      $or: [
        {open: { $regex: req.query.searchInput, $options: 'i'}},
        {entrydateString: { $regex: req.query.searchInput, $options: 'i'}},
        {instrument: { $regex: req.query.searchInput, $options: 'i' }},
        {setup: { $regex: req.query.searchInput, $options: 'i' }},
        {position: { $regex: req.query.searchInput, $options: 'i' }},
        {plannedentryString: { $regex: req.query.searchInput, $options: 'i' }},
        {entryString: { $regex: req.query.searchInput, $options: 'i' }},
        {tpString: { $regex: req.query.searchInput, $options: 'i' }},
        {slString: { $regex: req.query.searchInput, $options: 'i' }},
        {exitdateString: { $regex: req.query.searchInput, $options: 'i' }},
        {exitString: { $regex: req.query.searchInput, $options: 'i' }},
        {mfeString: { $regex: req.query.searchInput, $options: 'i' }},
        {maeString: { $regex: req.query.searchInput, $options: 'i' }},
        {fglString: { $regex: req.query.searchInput, $options: 'i' }},
        {feesString: { $regex: req.query.searchInput, $options: 'i' }},
        {'variables.title': { $regex: req.query.searchInput, $options: 'i' }},
        {'variables.variable': { $regex: req.query.searchInput, $options: 'i' }},
        {comments: { $regex: req.query.searchInput, $options: 'i' }},
        {tv: { $regex: req.query.searchInput, $options: 'i' }},
      ],
      
      
    })
    .limit(req.query.limit)
    .skip(req.query.skip)
    .exec((err, result)=>{
      if(err){
        return res.json({error:err})
      }
      res.json({result, count})
    })
    
  })
  
  
  
}



exports.trades_edit_variables = (req, res, next) => {
  Trades.updateMany(
    { 
      username: req.query.username, 
      'variables.title': req.body.variables.previousTitle 
    },
    { 
      $set: { 'variables.$.title': req.body.variables.newTitle } 
    },
    { new: true },
    (err, trades) => {
      if (err) {
        return res.json({ error: err });
      }
      res.json({ trades });
    }
  );
};

/*

exports.trades_edit_variables = (req, res, next) => {
  Trades.updateMany(
    { username: req.query.username},
    {
      $addToSet: { 'variables': { title: req.body.variables.newTitle, variable: '' } },
      $set: { 'variables.$[elem].title': req.body.variables.newTitle },
    },
    { 
      new: true, 
      arrayFilters: [{ 'elem.title': req.body.variables.previousTitle }] 
    },
    (err, trades) => {
      if (err) {
        return res.json({ error: err });
      }
      res.json({ trades });
    }
  );
};

*/