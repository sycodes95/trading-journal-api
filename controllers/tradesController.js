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
    current: req.body.current,
    setup: req.body.setup,
    position: req.body.position,
    entry: req.body.entry,
    tp: req.body.tp,
    sl: req.body.sl,
    mfe: req.body.mfe,
    mae: req.body.mae,
    result: req.body.result,
    fgl: req.body.fgl,
    rgl: req.body.rgl,
    comments: req.body.comments,
    tv: req.body.tv,
    public: req.body.public,

  }).save((err, result) => {
    if (err) {
      return res.json({errors: err});
    }
    res.json({trade: result});
        console.log(trade);
  });
}