const TradingRules = require('../models/tradingRules')

const Trades = require('../models/trades')

const async = require("async")

const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs")

const { check, body, validationResult } = require("express-validator");

const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.new_trading_rule_post = (req,res,next) =>{

  const rules = new TradingRules({

    username: req.body.username,
    rules: req.body.rules

  }).save((err, result) => {
    if (err) {
      return res.json({errors: err});
    }
    res.json({rules: result});
        console.log(rules);
  });
}