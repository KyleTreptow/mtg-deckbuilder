var express = require('express');
var router = express.Router();

var mtg = require('mtgsdk');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'MTG Deck Builder',
    msg: 'App Init: data passed to vue!'
  });
});

/* GET sample card data. */
router.get('/cards/', function(req, res, next) {
  mtg.card.where({ supertypes: 'legendary', subtypes: 'praetor|god' })
  .then(result => {
    res.json(result);
  });
});

module.exports = router;
