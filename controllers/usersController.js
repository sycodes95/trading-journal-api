const Users = require('../models/users')



const async = require("async")

const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs")

const { check, body, validationResult } = require("express-validator");

const jwt = require('jsonwebtoken')

require('dotenv').config()



//------------------------------------------------

exports.verify_token_get = (req,res,next) => {
  const bearerHeader = req.headers['authorization'];
  
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1];
    
    jwt.verify(bearerToken, process.env.JWT_SECRETKEY, (err, user)=>{
      console.log(err);
      if(err) {
        return res.status(401).json({error: "Invalid token"});
      } else {
        res.json({
          message: 'User authorized',
          user
        })
      }
    })
    
  } else {
    return res.status(401).json({error: "Invalid token"});
  }

  
}

//------------------------------------------------
/*
exports.sign_up_get = (req, res) =>{
  res.render('signup_form')
}
*/

exports.sign_up_post = [
  check('password').exists(),
  check('confirm_password')
    .exists()
    .custom((value, { req }) => {
      if(value !== req.body.password){
        throw new Error('Passwords don\'t match')
      }
      return true
    }),
    
  (req, res, next) =>{
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const plainPassword = req.body.password
    console.log(plainPassword);
    bcrypt.hash(plainPassword, 10, (err, hashedPassword) =>{
      console.log(hashedPassword);
      if(err){
        return next(err)
      }
      const user = new Users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hashedPassword
      }).save((err, result) => {
        console.log(err);
        if (err) { 
          
          return res.json({errors: err});
        }
        res.json({user: result});
        console.log(user);
        
      });
      
      
    })
    
  }
];

exports.log_in_get = (req, res) =>{
  res.json({user: req.user})
}



exports.log_in_post = (req, res, next) =>{
  passport.authenticate("local", (err, user, info) =>{
    console.log(user);
    if(err) {
      return next(err)
    }
    if(!user){
      return res.json('nouser')
    }
    req.logIn(user, (err) =>{
      if(err) {
        return next(err)
      }
      //return res.render('index', {user: user})
      const token = jwt.sign({ user: user}, process.env.JWT_SECRETKEY);
      return res.json({token})
        
      
    })
  })(req,res,next)
}

exports.log_out_get = (req,res,next) =>{
  req.logout(function (err){
    if(err) {
      return res.json({error: err})
    }
    res.clearCookie('token');
    res.json({logout: 'Log out successful'})
  })
}



