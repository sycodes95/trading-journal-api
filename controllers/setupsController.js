const Setups = require('../models/setups')

const async = require("async")

require('dotenv').config()



exports.new_setup_post = async (req,res,next) =>{
  const userSetups = await Setups.countDocuments({username: req.body.username});
  
  if(userSetups > 19){
    return res.status(400).json({error: 'User reached maximum setups'})
  }
  const setup = new Setups({
    
    username: req.body.username,
    setup: req.body.setup,
    active: req.body.active 

  }).save((err, result) => {
    console.log('hi');
    if (err) {
      return res.json({error: err});
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

exports.setup_active_patch = (req,res,next) =>{
  Setups.findOne({_id: req.body.id}, (err,doc) => {
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