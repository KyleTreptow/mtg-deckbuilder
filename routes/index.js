var express = require('express');
var router = express.Router();

var mtg = require('mtgsdk');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'MTG Deck Builder',
    msg: 'Grabbing Sample Cards: subtype = God OR Praetor'
  });
});

/* GET sample card data. */
router.get('/cards/', function(req, res, next) {
  mtg.card.where({
    name: req.query.name,
    supertypes: req.query.supertypes,
    types: req.query.types,
    subtypes: 'god|praetor'
  })
  .then(results => {
    res.json(results)
  })
});

module.exports = router;
