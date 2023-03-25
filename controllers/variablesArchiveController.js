const VariablesArchive = require('../models/variablesArchive')

exports.variables_archive_post = (req, res, next) => {
  const variableArchive = new VariablesArchive ({
    username: req.body.username,
    title: req.body.title,
    variables: req.body.variables,
    date: req.body.date
  }).save((err, result) => {
    if(err) {
      return res.json({error:err});
    }
    res.json({result});

  })
}

exports.variables_archive_get = (req, res, next) => {
  VariablesArchive.find({username: req.query.username})
  .sort({date: -1})
  .exec((err, result) =>{
    if(err) {
      return next(err)
    }
    res.json({result})
    
  })
}

exports.variables_archive_delete = (req, res, next) => {
  VariablesArchive.findOneAndDelete({username: req.query.username, _id: req.query._id})
  .sort({date: -1})
  .exec((err, result) =>{
    if(err) {
      return next(err)
    }
    res.json({result})
    
  })
}