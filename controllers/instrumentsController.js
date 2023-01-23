const Instruments = require('../models/instruments')

const async = require("async")

require('dotenv').config()

exports.new_instrument_post = async (req,res,next) =>{
  const userInstruments = await Instruments.countDocuments({username: req.body.username});
  
  if(userInstruments > 49){
    return res.status(400).json({error: 'User reached maximum instruments'})
  }
  const instrument = new Instruments({

    username: req.body.username,
    instrument: req.body.instrument,

  }).save((err, result) => {
    console.log('hi');
    if (err) {
      return res.json({error: err});
    }
    res.json({instrument: result});
        console.log(result);
  });
}

exports.instrument_get = (req,res,next) =>{
  
  Instruments.find({username: req.query.username}).sort({_id:-1}).exec((err, docs) => {
    if(err) {
      return res.json({errors: err});
    }
    console.log(docs);
    res.json({instruments: docs})
  })
}
exports.instrument_delete = (req,res,next) =>{
  console.log(req.body.id);
  Instruments.findByIdAndRemove(req.body.id)
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
/*
exports.instrument_active_patch = (req,res,next) =>{
  instruments.findOne({_id: req.body.id}, (err,doc) => {
    if(err) {
      return res.json({error: err})
    } else {
      doc.active = !doc.active;
        doc.save((err, updatedDocument) => {
          if (err) {
            return res.json({error: err})
          } else {
            res.json({updated: updatedDocument})
          }
      });
    }
  })
    
    
}
*/